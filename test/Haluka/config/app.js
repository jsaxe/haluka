'use strict'
var env = app('Env')

module.exports = {

	/*
	|--------------------------------------------------------------------------
	| Name of Application
	|--------------------------------------------------------------------------
	|
	| This is the name of the application. This value is used when
	| application's name is required.
	|
	*/
	name: env.get('APP_NAME', 'Haluka'),


	/*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    |
    | This value determines the "environment" on which application is currently
	| running in. Set this in your ".env" file.
	|
	*/
	env: env.get('APP_ENV', 'production'),

	/*
    |--------------------------------------------------------------------------
    | Application URL
    |--------------------------------------------------------------------------
    |
	| This value determines the "URL" of the application for generating links.
	| This should be set at the root of the application.
	|
	*/
	url: env.get('APP_URL', 'http://localhost'),

}
