import { RouterContract } from '@ioc:Adonis/Core/Route';

export default function v1(Route: RouterContract) {
	Route.group(() => {
		Route.post('login', 'AuthController.login');
		Route.post('register', 'AuthController.register');
	}).prefix('auth');

	Route.group(() => {
		Route.get('users/suggestions', 'UsersController.suggestions');
		Route.resource('users', 'UsersController').apiOnly();
	}).middleware('auth');
}
