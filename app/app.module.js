(function() {
    'use strict';

    angular.module('app', [
        'ngRoute',
        'ngMessages',
        'app.home',
        'app.users'
        ])
        .config(config)
        .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
}());


