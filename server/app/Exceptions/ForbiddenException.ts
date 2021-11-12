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
| new ForbiddenException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ForbiddenException extends Exception {
	constructor(message?: string) {
		super('', 403, 'E_FORBIDDEN_EXCEPTION');

		this.message = message || 'This action is forbidden.';
	}

	public async handle(_: this, ctx: HttpContextContract) {
		ctx.response.status(403).json(this.toObject());
	}
}
