import 'reflect-metadata';
import execa from 'execa';
import { join } from 'path';
import getPort from 'get-port';
import { configure } from 'japa';
import sourceMapSupport from 'source-map-support';
import fs from 'fs/promises';

process.env.NODE_ENV = 'testing';
process.env.ADONIS_ACE_CWD = join(__dirname);
sourceMapSupport.install({ handleUncaughtExceptions: false });

async function setupDatabase() {
	await fs.writeFile(join(__dirname, 'tmp/db.sqlite3'), '');
}

async function runMigrations() {
	await execa.node('ace', ['migration:run'], {
		stdio: 'inherit',
	});
}

async function removeDatabase() {
	await fs.unlink(join(__dirname, 'tmp/db.sqlite3'));
}

async function startHttpServer() {
	const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor');
	process.env.PORT = String(await getPort());
	await new Ignitor(__dirname).httpServer().start();
}

/**
 * Configure test runner
 */
configure({
	files: ['tests/**/*.spec.ts'],
	before: [setupDatabase, runMigrations, startHttpServer],
	after: [removeDatabase],
});
