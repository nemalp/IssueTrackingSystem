(function() {
    'use strict';

    angular.module('app.users')
        .config(config)
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$http', '$location', 'usersService'];
    config.$inject = ['$routeProvider'];

    function UsersController($http, $location, usersService) {
        var vm = this;

        vm.age = 33;

        
    }

    function config($routeProvider) {

    }


}());
