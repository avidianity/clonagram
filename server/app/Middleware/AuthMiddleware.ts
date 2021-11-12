import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UnauthorizedException from 'App/Exceptions/UnauthorizedException';

export default class AuthMiddleware {
	public async handle(
		{ request }: HttpContextContract,
		next: () => Promise<void>
	) {
		try {
			const user = await request.user();

			if (!user) {
				throw new UnauthorizedException();
			}

			return await next();
		} catch (_) {
			throw new UnauthorizedException();
		}
	}
}
