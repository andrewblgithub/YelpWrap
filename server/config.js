const knex = require('knex')({
	client: 'pg',
	connection: {
		host: 'yelpwrap.ccvz2vysnybs.us-east-2.rds.amazonaws.com',
		port: '5432',
		user: 'yelpwrap',
		password: 'yelpwrap',
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
			table.string('homezip');
			table.string('image_url')
		}).then(table => {
			console.log('Created table:', table);
			knex('users').insert({
				name: 'chatbot',
				image_url: 'https://edspace.american.edu/perf683/wp-content/uploads/sites/392/2015/10/robot.png'
			}).then(()=>{console.log('created chatbot')})
		}).catch(err => {
			console.error('Error:', err);
		})
	}
});

knex.schema.hasTable('restaurants').then(exists => {
	if(!exists) {
		knex.schema.createTable('restaurants', (table) => {
			table.increments('id').primary();
			table.string('url', 255);
			table.string('name', 255);
			table.string('phone', 16);
			table.string('display_address', 255);
			table.string('image_url', 255);
			table.string('location', 255);
			table.string('zipcode', 255);
		}).then(table => {
			console.log('Created table:', table);
		})
	}
})

knex.schema.hasTable('user_restaurants').then(exists => {
	if(!exists) {
		knex.schema.createTable('user_restaurants', (table) => {
			table.increments('id').primary();
			table.integer('userId').references('id').inTable('users');
			table.integer('restaurantId').references('id').inTable('restaurants');
		}).then(table => {
			console.log('Created table:', table);
		})
	}
})

knex.schema.hasTable('messages').then(exists => {
	if(!exists) {
		knex.schema.createTable('messages', (table) => {
			table.increments('id').primary();
			table.text('content');
			table.integer('roomId').references('id').inTable('ziproom');
			table.integer('userId').references('id').inTable('users');
			table.timestamp('created_at').defaultTo(knex.fn.now())
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
			table.string('zipcode', 15);
			table.integer('user_count');
			table.string('top_restaurant', 255);
		}).then(table => {
			console.log('Created table:', table);
		})
	}
})

const db = require('bookshelf')(knex);
db.plugin('registry')

module.exports = {db, knex};