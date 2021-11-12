/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env';
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database';
import Application from '@ioc:Adonis/Core/Application';

const databaseConfig: DatabaseConfig = {
	/*
	|--------------------------------------------------------------------------
	| Connection
	|--------------------------------------------------------------------------
	|
	| The primary connection for making database queries across the application
	| You can use any key from the `connections` object defined in this same
	| file.
	|
	*/
	connection: Env.get('DB_CONNECTION'),

	connections: {
		mysql: {
			client: 'mysql',
			connection: {
				host: Env.get('DB_HOST'),
				port: Env.get('DB_PORT'),
				user: Env.get('DB_USER'),
				password: Env.get('DB_PASSWORD', ''),
				database: Env.get('DB_NAME'),
			},
			migrations: {
				naturalSort: true,
			},
			healthCheck: true,
			debug: false,
		},

		pgsql: {
			client: 'pg',
			connection: {
				host: Env.get('DB_HOST'),
				port: Env.get('DB_PORT'),
				user: Env.get('DB_USER'),
				password: Env.get('DB_PASSWORD', ''),
				database: Env.get('DB_NAME'),
			},
			migrations: {
				naturalSort: true,
			},
			healthCheck: true,
			debug: false,
		},

		sqlite: {
			client: 'sqlite',
			connection: {
				filename: Application.tmpPath('db.sqlite3'),
			},
			migrations: {
				naturalSort: true,
			},
			useNullAsDefault: true,
			healthCheck: true,
			debug: false,
		},
	},
};

export default databaseConfig;
