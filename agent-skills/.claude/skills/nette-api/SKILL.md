---
name: nette-api
description: RESTful JSON API skill for Nette Framework
---

# Nette REST JSON API Skill

## Overview

This skill helps you build RESTful JSON APIs using the Nette Framework. It provides complete guidance for creating API endpoints, handling JSON requests and responses, configuring routes, implementing CRUD operations, and following REST best practices.

## Project structure

```
app/UI/Api/[Acme]/Get[Acme]Presenter.php
app/UI/Api/[Acme]/Create[Acme]Presenter.php
app/UI/Api/[Acme]/Update[Acme]Presenter.php
app/UI/Api/[Acme]/List[Acme]Presenter.php
app/UI/Api/[Acme]/Delete[Acme]Presenter.php
```

## Presenter

Extends base ApiPresenter. 

### ApiPresenter

```php
<?php

declare(strict_types=1);

namespace App\UI\Api;

use Nette\Application\IPresenter;
use Nette\Application\Request;
use Nette\Application\Response;
use Nette\Application\Responses\JsonResponse;

abstract class ApiPresenter implements IPresenter
{
    public function run(Request $request): Response
    {
        $payload = $this->action($request);
        
        return new JsonResponse($payload);
    }

    abstract protected function action(Request $request): mixed;
}
```

## CRUD

### Get Operation

```php
// app/UI/Api/User/GetUserPresenter.php
final class GetUserPresenter extends ApiPresenter
{
    public function __construct(
        private readonly UserFacade $userFacade,
    ) {}

    protected function action(Request $request): mixed
    {
        $id = $request->getParameter('id');
        // ... validate id ...
        
        return $this->userFacade->get($id);
    }
}
```

### Create Operation

```php
// app/UI/Api/User/CreateUserPresenter.php
final class CreateUserPresenter extends ApiPresenter
{
    public function __construct(
        private readonly UserFacade $userFacade,
    ) {}

    protected function action(Request $request): mixed
    {
        // Assuming JSON body content
        $data = json_decode(file_get_contents('php://input'), true);
        
        return $this->userFacade->create($data);
    }
}
```

## Testing

### Unit Testing Presenters

It is recommended to instantiate the `Nette\Application\Request` directly rather than mocking it, as it acts as a Value Object.

```php
use App\UI\Api\User\GetUserPresenter;
use Nette\Application\Request;
use Nette\Application\Responses\JsonResponse;
use Tester\Assert;

// 1. Prepare dependencies (Mockery)
$userFacade = Mockery::mock(UserFacade::class);
$userFacade->shouldReceive('get')->with(1)->andReturn(['id' => 1, 'name' => 'John']);

// 2. Instantiate Presenter
$presenter = new GetUserPresenter($userFacade);

// 3. Create Request (Fake)
$request = new Request(
    name: 'Api:User:GetUser',
    method: 'GET',
    params: ['id' => 1]
);

// 4. Run & Assert
$response = $presenter->run($request);

Assert::type(JsonResponse::class, $response);
Assert::same(['id' => 1, 'name' => 'John'], $response->getPayload());
```
