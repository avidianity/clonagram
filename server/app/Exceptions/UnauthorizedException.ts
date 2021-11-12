import { Exception } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnauthorizedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UnauthorizedException extends Exception {
	constructor(message?: string) {
		super('', 401, 'E_UNAUTHORIZED_EXCEPTION');

		this.message = message || 'This action is unauthorized.';
	}

	public async handle(_: this, ctx: HttpContextContract) {
		ctx.response.status(401).json(this.toObject());
	}
}
