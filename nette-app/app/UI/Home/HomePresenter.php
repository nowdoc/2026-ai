<?php declare(strict_types = 1);

namespace App\UI\Home;

use App\Domain\User\User;
use App\UI\BasePresenter;
use Doctrine\ORM\EntityManagerInterface;
use Nette\DI\Attributes\Inject;
use Nette\Utils\Random;

class HomePresenter extends BasePresenter
{

	#[Inject]
	public EntityManagerInterface $em;

	public function actionDefault(): void
	{
		$users = $this->em->getRepository(User::class)->findAll();

		$this->template->users = $users;
	}

	public function handleCreateUser(): void
	{
		$user = new User(Random::generate(20));
		$this->em->persist($user);
		$this->em->flush();
		$this->flashMessage('User created.', 'success');
		$this->redirect('this');
	}

	public function handleCreate5RandomUsers(): void
	{
		for ($i = 0; $i < 5; $i++) {
			$this->em->persist(new User(Random::generate(20)));
		}

		$this->em->flush();

		$this->flashMessage('5 users created.', 'success');
		$this->redirect('this');
	}

	public function handleDeleteUsers(): void
	{
		$affected = (int) $this->em->getRepository(User::class)
			->createQueryBuilder('u')
			->delete()
			->getQuery()
			->execute();

		if ($affected === 0) {
			$this->flashMessage('No users to remove.', 'info');
		} else {
			$this->flashMessage(sprintf('Removed %d %s.', $affected, $affected === 1 ? 'user' : 'users'), 'success');
		}
		$this->redirect('this');
	}

}
