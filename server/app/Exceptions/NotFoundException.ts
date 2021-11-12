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
| new NotFoundException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class NotFoundException extends Exception {
	constructor(message?: string) {
		super('', 404, 'E_NOT_FOUND_EXCEPTION');

		this.message = message || 'Something was not found.';
	}

	public async handle(_: this, ctx: HttpContextContract) {
		ctx.response.status(404).json(this.toObject());
	}
}
