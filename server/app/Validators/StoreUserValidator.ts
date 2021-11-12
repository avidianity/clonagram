import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class StoreUserValidator {
	constructor(protected ctx: HttpContextContract) {}

	/*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 *
	 * For example:
	 * 1. The username must be of data type string. But then also, it should
	 *    not contain special characters or numbers.
	 *    ```
	 *     schema.string({}, [ rules.alpha() ])
	 *    ```
	 *
	 * 2. The email must be of data type string, formatted as a valid
	 *    email. But also, not used by any other user.
	 *    ```
	 *     schema.string({}, [
	 *       rules.email(),
	 *       rules.unique({ table: 'users', column: 'email' }),
	 *     ])
	 *    ```
	 */
	public schema = schema.create({
		name: schema.string({}, [rules.alpha()]),
		username: schema.string({}, [
			rules.unique({ table: 'users', column: 'username' }),
		]),
		website: schema.string.optional({}, [rules.url()]),
		bio: schema.string.optional(),
		email: schema.string.optional({}, [
			rules.requiredIfNotExists('phone'),
			rules.email(),
			rules.unique({ table: 'users', column: 'email' }),
		]),
		phone: schema.string.optional({}, [
			rules.requiredIfNotExists('email'),
			rules.mobile(),
		]),
		gender: schema.string.optional(),
		suggest: schema.boolean.optional(),
		active: schema.boolean.optional(),
		password: schema.string({}, [rules.minLength(7)]),
		birthday: schema.date(),
	});

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
	public messages = {};
}
