import { UserFactory } from 'Database/factories';
import test from 'japa';
import supertest from 'supertest';
import faker from 'faker';
import jwt from 'jsonwebtoken';

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;

test.group('authentication', () => {
	test('throw validation error on login', async (assert) => {
		const response = await supertest(BASE_URL).post('/v1/auth/login');
		assert.equal(response.statusCode, 422);
		assert.hasAllKeys(response.body, ['errors']);
	});

	test('logs in successfully', async (assert) => {
		const password = faker.internet.password();

		const user = await UserFactory.merge({ password }).create();

		const response = await supertest(BASE_URL)
			.post('/v1/auth/login')
			.send({ username: user.username, password });
		assert.equal(response.statusCode, 200);
		assert.hasAllKeys(response.body, ['token', 'user']);
		assert.isTrue(response.body.user.uuid === user.uuid);
	});

	test('registers successfully', async (assert) => {
		const { default: Config } = await import('@ioc:Adonis/Core/Config');
		const response = await supertest(BASE_URL)
			.post('/v1/auth/register')
			.send({
				name: faker.name.firstName(),
				username: faker.internet.userName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
				birthday: faker.date.past(5).toJSON(),
			});

		const payload = (() => {
			try {
				return jwt.verify(response.body.token, Config.get('jwt.key'));
			} catch (_) {
				return {};
			}
		})();

		assert.equal(response.statusCode, 201);
		assert.hasAllKeys(response.body, ['token', 'user']);
		assert.isTrue(payload['id'] === response.body.user.uuid);
	});
});
