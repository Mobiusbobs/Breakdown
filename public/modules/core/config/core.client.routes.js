'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/landing.client.view.html'
		}).
		state('editor', {
			url: '/editor',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('myProject', {
			url: '/myProject',
			templateUrl: 'modules/core/views/myProject.client.view.html'
		}).
		state('market', {
			url: '/market',
			templateUrl: 'modules/core/views/market.client.view.html'
		});
	}
]);