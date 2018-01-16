const config =require('../config.js');

const knex = require('knex')({
	client: 'pg',
	connection: {
		host: 'localhost',
		port: '5432',
		user: `christinemourani`,
		database: 'yelpwrap'
	}
});

knex.schema.hasTable('users').then(exists => {
	if (!exists) {
		knex.schema.createTable('users', (table) => {
			table.increments('id').primary();
			table.string('email', 255).unique();
			table.string('password');
			table.string('name');
		}).then(table => {
			console.log('Created table:', table);
		}).catch(err => {
			console.error('Error:', err);
		})
	}
});

knex.schema.hasTable('favorites').then(exists => {
	if(!exists) {
		knex.schema.createTable('favorites', (table) => {
			table.increments('id').primary();
			table.integer('userId');
			table.string('url', 255);
			table.string('name', 255);
			table.string('phone', 16);
			table.string('display_address', 255);
			table.string('image_url', 255);
			table.string('location', 255);
		}).then(table => {
			console.log('Created table:', table);
		})
	}
})

knex.schema.hasTable('messages').then(exists => {
	if(!exists) {
		knex.schema.createTable('favorites', (table) => {
			table.increments('id').primary();
			table.text('content');
			table.integer('zipCode');
			table.foreign('userId').references('users.id');
		})
		.then(table => {
			console.log('Created table:', table);
		})
	}
})


knex.schema.hasTable('ziproom').then(exists => {
	if(!exists) {
		knex.schema.createTable('ziproom', (table) => {
			table.increments('id').primary();
			table.integer('zipcode');
			table.integer('user_count');
			table.string('top_restaurant', 255);
		}).then(table => {
			console.log('Created table:', table);
		})
	}
})

const db = require('bookshelf')(knex);

module.exports = {db, knex};