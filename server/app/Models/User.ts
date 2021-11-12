import { DateTime } from 'luxon';
import {
	BaseModel,
	beforeCreate,
	beforeSave,
	column,
} from '@ioc:Adonis/Lucid/Orm';
import { v4 } from 'uuid';
import Hash from '@ioc:Adonis/Core/Hash';

export default class User extends BaseModel {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public uuid: string;

	@column()
	public name: string;

	@column()
	public username: string;

	@column()
	public website: string;

	@column()
	public bio: string;

	@column()
	public email: string;

	@column()
	public phone: string;

	@column()
	public gender: string;

	@column()
	public suggest: boolean;

	@column()
	public active: boolean;

	@column()
	public password: string;

	@column.date()
	public birthday: DateTime;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;

	@beforeCreate()
	public static beforeCreateHook(user: User) {
		user.uuid = v4();
	}

	@beforeSave()
	public static async hashPassword(user: User) {
		if (user.$dirty.password) {
			user.password = await Hash.make(user.password);
		}
	}
}
