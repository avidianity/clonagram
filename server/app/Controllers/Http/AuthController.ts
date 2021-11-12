import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Config from '@ioc:Adonis/Core/Config';
import LoginValidator from 'App/Validators/LoginValidator';
import User from 'App/Models/User';
import NotFoundException from 'App/Exceptions/NotFoundException';
import jwt from 'jsonwebtoken';
import Hash from '@ioc:Adonis/Core/Hash';
import ForbiddenException from 'App/Exceptions/ForbiddenException';
import { except } from '@avidian/functions';
import RegisterValidator from 'App/Validators/RegisterValidator';

export default class AuthController {
	public async login({ request }: HttpContextContract) {
		const data = await request.validate(LoginValidator);

		const user = await User.query()
			.where('email', data.username)
			.orWhere('username', data.username)
			.first();

		if (!user) {
			throw new NotFoundException('User does not exist.');
		}

		if (!(await Hash.verify(user.password, data.password))) {
			throw new ForbiddenException('Password is incorrect.');
		}

		const payload = except(user.toJSON(), ['password']);

		const token = jwt.sign({ id: payload.uuid }, Config.get('jwt.key'));

		return {
			user: payload,
			token,
		};
	}

	public async register({ request, response }: HttpContextContract) {
		const data = await request.validate(RegisterValidator);

		const user = await User.create(data);

		const token = jwt.sign({ id: user.uuid }, Config.get('jwt.key'));

		const payload = except(user.toJSON(), ['password']);

		return response.status(201).json({
			user: payload,
			token,
		});
	}
}
