(function() {
    'use strict';

    angular.module('issueTrackingSystem', [
        'ngRoute',
        'ngMessages',
        'issueTrackingSystem.home',
        'issueTrackingSystem.users.authentication'
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


