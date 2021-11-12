import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Users extends BaseSchema {
	protected tableName = 'users';

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id');
			table.uuid('uuid').index();
			table.string('name');
			table.string('username');
			table.string('website');
			table.text('bio');
			table.string('email');
			table.string('phone');
			table.string('gender');
			table.boolean('suggest').defaultTo(true);
			table.boolean('active').defaultTo(true);
			table.string('password');
			table.date('birthday');
			table.timestamp('created_at', { useTz: true });
			table.timestamp('updated_at', { useTz: true });
		});
	}

	public async down() {
		this.schema.dropTable(this.tableName);
	}
}
