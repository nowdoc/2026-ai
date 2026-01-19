<?php declare(strict_types = 1);

namespace Tests\Unit\Domain\User;

use App\Domain\User\User;
use Tester\Assert;
use Tester\TestCase;

require_once __DIR__ . '/../../../bootstrap.php';

final class UserTest extends TestCase
{

	public function testEntity(): void
	{
		$user = new User('foo');
		Assert::equal('foo', $user->getUsername());
	}

}

(new UserTest())->run();
