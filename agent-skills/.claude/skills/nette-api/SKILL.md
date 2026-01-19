---
name: nette-api
description: Create REST JSON APIs in Nette Framework. Use when building API endpoints, implementing REST controllers, handling JSON requests/responses, adding CRUD operations, setting up API routes, or working with JSON serialization in Nette applications. Focused exclusively on REST API development with JSON.
allowed-tools: Read, Grep, Glob, Bash, Edit, Write
---

# Nette REST JSON API Skill

## Overview

This skill helps you build RESTful JSON APIs using the Nette Framework. It provides complete guidance for creating API endpoints, handling JSON requests and responses, configuring routes, implementing CRUD operations, and following REST best practices.

## Core Capabilities

- Create REST API Presenters (controllers) with proper structure
- Handle JSON request parsing and response formatting
- Configure RESTful routes with proper patterns
- Implement full CRUD operations (Create, Read, Update, Delete)
- Return appropriate HTTP status codes
- Format error responses as JSON
- Handle entity serialization
- Support pagination and filtering
- Implement API versioning

## REST API Patterns in Nette

### Directory Structure

Place API presenters in: `/api/app/UI/Api/`

Example structure:
```
/api/app/UI/Api/
├── BaseApiPresenter.php    # Base class for all API presenters
├── V1/
│   ├── UserPresenter.php
│   ├── ProductPresenter.php
│   └── OrderPresenter.php
```

### HTTP Status Codes

Always return appropriate status codes:
- `200 OK` - Successful GET request
- `201 Created` - Successful POST (resource created)
- `204 No Content` - Successful DELETE or PUT with no response body
- `400 Bad Request` - Invalid input, validation errors
- `404 Not Found` - Resource doesn't exist
- `500 Internal Server Error` - Server errors

## Creating API Endpoints

### Step 1: Create Base API Presenter

First, create a base presenter that all API presenters will extend:

```php
<?php

declare(strict_types=1);

namespace App\UI\Api;

use Nette\Application\UI\Presenter;
use Nette\Application\Responses\JsonResponse;

abstract class BaseApiPresenter extends Presenter
{
    protected function sendJson(mixed $data, int $code = 200): never
    {
        $this->getHttpResponse()->setCode($code);
        $this->sendResponse(new JsonResponse($data));
    }

    protected function sendError(string $message, int $code = 400, array $errors = []): never
    {
        $response = [
            'error' => $message,
        ];

        if (!empty($errors)) {
            $response['errors'] = $errors;
        }

        $this->getHttpResponse()->setCode($code);
        $this->sendResponse(new JsonResponse($response));
    }

    protected function getJsonInput(): array
    {
        $rawBody = $this->getHttpRequest()->getRawBody();

        if (empty($rawBody)) {
            $this->sendError('Empty request body', 400);
        }

        try {
            $data = json_decode($rawBody, true, 512, JSON_THROW_ON_ERROR);
        } catch (\JsonException $e) {
            $this->sendError('Invalid JSON: ' . $e->getMessage(), 400);
        }

        return $data;
    }

    protected function startup(): void
    {
        parent::startup();

        // Disable CSRF protection for API endpoints
        $this->getComponent('csrfToken')->setEnabled(false);
    }
}
```

### Step 2: Create Resource Presenter

Create a presenter for a specific resource with CRUD operations:

```php
<?php

declare(strict_types=1);

namespace App\UI\Api\V1;

use App\UI\Api\BaseApiPresenter;
use App\Domain\User\UserRepository;
use App\Domain\User\User;
use Nette\DI\Attributes\Inject;
use Doctrine\ORM\EntityManagerInterface;

final class UserPresenter extends BaseApiPresenter
{
    #[Inject]
    public UserRepository $userRepository;

    #[Inject]
    public EntityManagerInterface $em;

    /**
     * GET /api/v1/users
     * List all users with optional pagination
     */
    public function actionList(): void
    {
        $page = (int) $this->getParameter('page', 1);
        $limit = (int) $this->getParameter('limit', 20);
        $offset = ($page - 1) * $limit;

        $users = $this->userRepository->findBy([], null, $limit, $offset);
        $total = $this->userRepository->count([]);

        $data = [
            'data' => array_map(fn(User $user) => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'name' => $user->getName(),
                'createdAt' => $user->getCreatedAt()->format('c'),
            ], $users),
            'meta' => [
                'total' => $total,
                'page' => $page,
                'limit' => $limit,
                'pages' => ceil($total / $limit),
            ],
        ];

        $this->sendJson($data);
    }

    /**
     * GET /api/v1/users/{id}
     * Get single user by ID
     */
    public function actionDetail(int $id): void
    {
        $user = $this->userRepository->find($id);

        if ($user === null) {
            $this->sendError('User not found', 404);
        }

        $data = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'name' => $user->getName(),
            'createdAt' => $user->getCreatedAt()->format('c'),
            'updatedAt' => $user->getUpdatedAt()?->format('c'),
        ];

        $this->sendJson($data);
    }

    /**
     * POST /api/v1/users
     * Create new user
     */
    public function actionCreate(): void
    {
        $input = $this->getJsonInput();

        // Validate required fields
        $errors = [];
        if (empty($input['email'])) {
            $errors['email'] = 'Email is required';
        }
        if (empty($input['name'])) {
            $errors['name'] = 'Name is required';
        }

        if (!empty($errors)) {
            $this->sendError('Validation failed', 400, $errors);
        }

        // Check if user already exists
        $existingUser = $this->userRepository->findOneBy(['email' => $input['email']]);
        if ($existingUser !== null) {
            $this->sendError('User with this email already exists', 400);
        }

        try {
            $user = new User();
            $user->setEmail($input['email']);
            $user->setName($input['name']);

            $this->em->persist($user);
            $this->em->flush();

            $data = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'name' => $user->getName(),
                'createdAt' => $user->getCreatedAt()->format('c'),
            ];

            $this->sendJson($data, 201);
        } catch (\Exception $e) {
            $this->sendError('Failed to create user: ' . $e->getMessage(), 500);
        }
    }

    /**
     * PUT /api/v1/users/{id}
     * Update existing user
     */
    public function actionUpdate(int $id): void
    {
        $user = $this->userRepository->find($id);

        if ($user === null) {
            $this->sendError('User not found', 404);
        }

        $input = $this->getJsonInput();

        try {
            if (isset($input['email'])) {
                $user->setEmail($input['email']);
            }
            if (isset($input['name'])) {
                $user->setName($input['name']);
            }

            $this->em->flush();

            $data = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'name' => $user->getName(),
                'updatedAt' => $user->getUpdatedAt()?->format('c'),
            ];

            $this->sendJson($data);
        } catch (\Exception $e) {
            $this->sendError('Failed to update user: ' . $e->getMessage(), 500);
        }
    }

    /**
     * DELETE /api/v1/users/{id}
     * Delete user
     */
    public function actionDelete(int $id): void
    {
        $user = $this->userRepository->find($id);

        if ($user === null) {
            $this->sendError('User not found', 404);
        }

        try {
            $this->em->remove($user);
            $this->em->flush();

            // Return 204 No Content for successful deletion
            $this->getHttpResponse()->setCode(204);
            $this->terminate();
        } catch (\Exception $e) {
            $this->sendError('Failed to delete user: ' . $e->getMessage(), 500);
        }
    }
}
```

## Route Configuration

### Configure RouterFactory

Edit `/api/app/Model/Routing/RouterFactory.php` to add API routes:

```php
<?php

declare(strict_types=1);

namespace App\Model\Routing;

use Nette\Application\Routers\RouteList;
use Nette\Application\Routers\Route;
use Nette\Routing\Router;

final class RouterFactory
{
    public static function createRouter(): Router
    {
        $router = new RouteList;

        // API v1 Routes
        $router[] = new Route('api/v1/<presenter>/<action>[/<id>]', [
            'module' => 'Api:V1',
            'presenter' => 'Default',
            'action' => 'default',
            'id' => null,
        ]);

        // Default application routes
        $router[] = new Route('<presenter>/<action>[/<id>]', [
            'presenter' => 'Home',
            'action' => 'default',
        ]);

        return $router;
    }
}
```

### Route Patterns

RESTful route patterns:

| HTTP Method | Route | Presenter Action | Purpose |
|-------------|-------|-----------------|---------|
| GET | /api/v1/users | UserPresenter::actionList() | List all users |
| GET | /api/v1/users/123 | UserPresenter::actionDetail(123) | Get single user |
| POST | /api/v1/users | UserPresenter::actionCreate() | Create new user |
| PUT | /api/v1/users/123 | UserPresenter::actionUpdate(123) | Update user |
| DELETE | /api/v1/users/123 | UserPresenter::actionDelete(123) | Delete user |

## JSON Request/Response Handling

### Parsing JSON Requests

Use the `getJsonInput()` method from BaseApiPresenter:

```php
public function actionCreate(): void
{
    $input = $this->getJsonInput();

    // $input is now an associative array
    $email = $input['email'] ?? null;
    $name = $input['name'] ?? null;
}
```

### Formatting JSON Responses

Use the `sendJson()` method:

```php
// Simple data
$this->sendJson(['message' => 'Success']);

// With status code
$this->sendJson(['id' => 123, 'name' => 'John'], 201);

// Array of objects
$this->sendJson([
    'data' => $users,
    'meta' => ['total' => 100]
]);
```

### Error Responses

Use the `sendError()` method:

```php
// Simple error
$this->sendError('Invalid request', 400);

// With validation errors
$this->sendError('Validation failed', 400, [
    'email' => 'Email is required',
    'name' => 'Name must be at least 3 characters'
]);

// Not found
$this->sendError('Resource not found', 404);

// Server error
$this->sendError('Internal server error', 500);
```

## CRUD Operations Implementation

### CREATE (POST)

```php
public function actionCreate(): void
{
    $input = $this->getJsonInput();

    // Validation
    if (empty($input['name'])) {
        $this->sendError('Name is required', 400);
    }

    // Create entity
    $entity = new Product();
    $entity->setName($input['name']);
    $entity->setPrice($input['price'] ?? 0);

    $this->em->persist($entity);
    $this->em->flush();

    // Return 201 Created with new resource
    $this->sendJson([
        'id' => $entity->getId(),
        'name' => $entity->getName(),
    ], 201);
}
```

### READ (GET) - Single Resource

```php
public function actionDetail(int $id): void
{
    $entity = $this->repository->find($id);

    if ($entity === null) {
        $this->sendError('Resource not found', 404);
    }

    $this->sendJson([
        'id' => $entity->getId(),
        'name' => $entity->getName(),
    ]);
}
```

### READ (GET) - Collection with Pagination

```php
public function actionList(): void
{
    $page = max(1, (int) $this->getParameter('page', 1));
    $limit = min(100, max(1, (int) $this->getParameter('limit', 20)));
    $offset = ($page - 1) * $limit;

    $entities = $this->repository->findBy([], null, $limit, $offset);
    $total = $this->repository->count([]);

    $this->sendJson([
        'data' => array_map(fn($e) => [
            'id' => $e->getId(),
            'name' => $e->getName(),
        ], $entities),
        'meta' => [
            'page' => $page,
            'limit' => $limit,
            'total' => $total,
            'pages' => ceil($total / $limit),
        ],
    ]);
}
```

### UPDATE (PUT/PATCH)

```php
public function actionUpdate(int $id): void
{
    $entity = $this->repository->find($id);

    if ($entity === null) {
        $this->sendError('Resource not found', 404);
    }

    $input = $this->getJsonInput();

    // Update only provided fields
    if (isset($input['name'])) {
        $entity->setName($input['name']);
    }
    if (isset($input['price'])) {
        $entity->setPrice($input['price']);
    }

    $this->em->flush();

    $this->sendJson([
        'id' => $entity->getId(),
        'name' => $entity->getName(),
    ]);
}
```

### DELETE

```php
public function actionDelete(int $id): void
{
    $entity = $this->repository->find($id);

    if ($entity === null) {
        $this->sendError('Resource not found', 404);
    }

    $this->em->remove($entity);
    $this->em->flush();

    // Return 204 No Content
    $this->getHttpResponse()->setCode(204);
    $this->terminate();
}
```

## Error Handling Best Practices

### Try-Catch Blocks

Always wrap database operations:

```php
try {
    $this->em->persist($entity);
    $this->em->flush();
    $this->sendJson(['id' => $entity->getId()], 201);
} catch (\Exception $e) {
    // Log the error
    \Tracy\Debugger::log($e);

    // Return generic error to client
    $this->sendError('Failed to create resource', 500);
}
```

### Validation Errors

Collect and return all validation errors:

```php
$errors = [];

if (empty($input['email'])) {
    $errors['email'] = 'Email is required';
} elseif (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Invalid email format';
}

if (empty($input['name'])) {
    $errors['name'] = 'Name is required';
}

if (!empty($errors)) {
    $this->sendError('Validation failed', 400, $errors);
}
```

### Not Found Errors

```php
$resource = $this->repository->find($id);

if ($resource === null) {
    $this->sendError('Resource not found', 404);
}
```

## Advanced Features

### Filtering

```php
public function actionList(): void
{
    $criteria = [];

    if ($status = $this->getParameter('status')) {
        $criteria['status'] = $status;
    }

    if ($category = $this->getParameter('category')) {
        $criteria['category'] = $category;
    }

    $entities = $this->repository->findBy($criteria);

    $this->sendJson(['data' => $entities]);
}
```

### Sorting

```php
public function actionList(): void
{
    $sortBy = $this->getParameter('sort', 'id');
    $sortOrder = $this->getParameter('order', 'ASC');

    // Validate sort field
    $allowedFields = ['id', 'name', 'createdAt'];
    if (!in_array($sortBy, $allowedFields)) {
        $sortBy = 'id';
    }

    // Validate sort order
    $sortOrder = strtoupper($sortOrder) === 'DESC' ? 'DESC' : 'ASC';

    $entities = $this->repository->findBy([], [$sortBy => $sortOrder]);

    $this->sendJson(['data' => $entities]);
}
```

### CORS Headers

Add to BaseApiPresenter:

```php
protected function startup(): void
{
    parent::startup();

    $response = $this->getHttpResponse();
    $response->setHeader('Access-Control-Allow-Origin', '*');
    $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight OPTIONS request
    if ($this->getHttpRequest()->getMethod() === 'OPTIONS') {
        $this->getHttpResponse()->setCode(204);
        $this->terminate();
    }
}
```

### API Versioning

Structure routes by version:

```
/api/app/UI/Api/
├── BaseApiPresenter.php
├── V1/
│   ├── UserPresenter.php
│   └── ProductPresenter.php
├── V2/
│   ├── UserPresenter.php
│   └── ProductPresenter.php
```

Route configuration:

```php
// API v2
$router[] = new Route('api/v2/<presenter>/<action>[/<id>]', [
    'module' => 'Api:V2',
]);

// API v1
$router[] = new Route('api/v1/<presenter>/<action>[/<id>]', [
    'module' => 'Api:V1',
]);
```

## Complete Example: Product API

```php
<?php

declare(strict_types=1);

namespace App\UI\Api\V1;

use App\UI\Api\BaseApiPresenter;
use App\Domain\Product\ProductRepository;
use App\Domain\Product\Product;
use Nette\DI\Attributes\Inject;
use Doctrine\ORM\EntityManagerInterface;

final class ProductPresenter extends BaseApiPresenter
{
    #[Inject]
    public ProductRepository $productRepository;

    #[Inject]
    public EntityManagerInterface $em;

    // GET /api/v1/products?page=1&limit=20&category=electronics
    public function actionList(): void
    {
        $page = max(1, (int) $this->getParameter('page', 1));
        $limit = min(100, max(1, (int) $this->getParameter('limit', 20)));
        $offset = ($page - 1) * $limit;

        $criteria = [];
        if ($category = $this->getParameter('category')) {
            $criteria['category'] = $category;
        }

        $products = $this->productRepository->findBy($criteria, ['id' => 'ASC'], $limit, $offset);
        $total = $this->productRepository->count($criteria);

        $this->sendJson([
            'data' => array_map(fn(Product $p) => [
                'id' => $p->getId(),
                'name' => $p->getName(),
                'price' => $p->getPrice(),
                'category' => $p->getCategory(),
                'inStock' => $p->isInStock(),
            ], $products),
            'meta' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => (int) ceil($total / $limit),
            ],
        ]);
    }

    // GET /api/v1/products/123
    public function actionDetail(int $id): void
    {
        $product = $this->productRepository->find($id);

        if ($product === null) {
            $this->sendError('Product not found', 404);
        }

        $this->sendJson([
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'category' => $product->getCategory(),
            'inStock' => $product->isInStock(),
            'createdAt' => $product->getCreatedAt()->format('c'),
        ]);
    }

    // POST /api/v1/products
    public function actionCreate(): void
    {
        $input = $this->getJsonInput();

        $errors = [];
        if (empty($input['name'])) {
            $errors['name'] = 'Name is required';
        }
        if (!isset($input['price']) || $input['price'] < 0) {
            $errors['price'] = 'Price must be a positive number';
        }
        if (empty($input['category'])) {
            $errors['category'] = 'Category is required';
        }

        if (!empty($errors)) {
            $this->sendError('Validation failed', 400, $errors);
        }

        try {
            $product = new Product();
            $product->setName($input['name']);
            $product->setPrice((float) $input['price']);
            $product->setCategory($input['category']);
            $product->setDescription($input['description'] ?? '');
            $product->setInStock($input['inStock'] ?? true);

            $this->em->persist($product);
            $this->em->flush();

            $this->sendJson([
                'id' => $product->getId(),
                'name' => $product->getName(),
                'price' => $product->getPrice(),
            ], 201);
        } catch (\Exception $e) {
            \Tracy\Debugger::log($e);
            $this->sendError('Failed to create product', 500);
        }
    }

    // PUT /api/v1/products/123
    public function actionUpdate(int $id): void
    {
        $product = $this->productRepository->find($id);

        if ($product === null) {
            $this->sendError('Product not found', 404);
        }

        $input = $this->getJsonInput();

        try {
            if (isset($input['name'])) {
                $product->setName($input['name']);
            }
            if (isset($input['price'])) {
                $product->setPrice((float) $input['price']);
            }
            if (isset($input['category'])) {
                $product->setCategory($input['category']);
            }
            if (isset($input['description'])) {
                $product->setDescription($input['description']);
            }
            if (isset($input['inStock'])) {
                $product->setInStock((bool) $input['inStock']);
            }

            $this->em->flush();

            $this->sendJson([
                'id' => $product->getId(),
                'name' => $product->getName(),
                'price' => $product->getPrice(),
            ]);
        } catch (\Exception $e) {
            \Tracy\Debugger::log($e);
            $this->sendError('Failed to update product', 500);
        }
    }

    // DELETE /api/v1/products/123
    public function actionDelete(int $id): void
    {
        $product = $this->productRepository->find($id);

        if ($product === null) {
            $this->sendError('Product not found', 404);
        }

        try {
            $this->em->remove($product);
            $this->em->flush();

            $this->getHttpResponse()->setCode(204);
            $this->terminate();
        } catch (\Exception $e) {
            \Tracy\Debugger::log($e);
            $this->sendError('Failed to delete product', 500);
        }
    }
}
```

## Testing Your API

### Using curl

```bash
# List products
curl http://localhost:8000/api/v1/products

# Get single product
curl http://localhost:8000/api/v1/products/1

# Create product
curl -X POST http://localhost:8000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":999.99,"category":"electronics"}'

# Update product
curl -X PUT http://localhost:8000/api/v1/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":899.99}'

# Delete product
curl -X DELETE http://localhost:8000/api/v1/products/1
```

## Summary

When building REST APIs in Nette:

1. Create BaseApiPresenter with helper methods
2. Extend it for each resource (User, Product, etc.)
3. Implement CRUD actions (actionList, actionDetail, actionCreate, actionUpdate, actionDelete)
4. Configure routes in RouterFactory
5. Use sendJson() for success responses
6. Use sendError() for error responses
7. Return proper HTTP status codes
8. Validate input before processing
9. Wrap database operations in try-catch
10. Support pagination, filtering, and sorting
