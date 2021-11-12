import User from 'App/Models/User';

declare module '@ioc:Adonis/Core/Request' {
	interface RequestContract {
		user(): Promise<User | null>;
	}
}
