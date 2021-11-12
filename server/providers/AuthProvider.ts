import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import jwt from 'jsonwebtoken';

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class AuthProvider {
	constructor(protected app: ApplicationContract) {}

	public register() {
		// Register your own bindings
	}

	public async boot() {
		const { default: Config } = await import('@ioc:Adonis/Core/Config');
		const { default: User } = await import('App/Models/User');
		const Request = this.app.container.use('Adonis/Core/Request');

		Request.macro('user', async function () {
			try {
				const bearer = this.header('Authorization');

				if (!bearer) {
					return null;
				}

				const fragments = bearer.split(' ');

				const token = fragments.last();

				if (!token) {
					return null;
				}

				const payload = jwt.verify(token, Config.get('jwt.key'));

				return await User.query().where('uuid', payload['id']).first();
			} catch (_) {
				return null;
			}
		});
	}

	public async ready() {
		// App is ready
	}

	public async shutdown() {
		// Cleanup, since app is going down
	}
}
