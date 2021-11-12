import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import { except } from '@avidian/functions';
import StoreUserValidator from 'App/Validators/StoreUserValidator';
import UpdateUserValidator from 'App/Validators/UpdateUserValidator';

export default class UsersController {
	public async index({}: HttpContextContract) {
		return await User.all();
	}

	public async suggestions({}: HttpContextContract) {
		return await User.query().where('suggest', true).exec();
	}

	public async store({ request, response }: HttpContextContract) {
		const data = await request.validate(StoreUserValidator);

		const user = await User.create(data);

		return response.status(201).json(except(user.toJSON(), ['password']));
	}

	public async show({ request }: HttpContextContract) {
		return await User.findOrFail(request.param('id'));
	}

	public async update({ request }: HttpContextContract) {
		const user = await User.findOrFail(request.param('id'));
		const data = await request.validate(UpdateUserValidator);

		return await user.merge(data).save();
	}

	public async destroy({ request }: HttpContextContract) {
		const user = await User.findOrFail(request.param('id'));

		return await user.delete();
	}
}
