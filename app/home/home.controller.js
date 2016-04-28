(function() {
    'use strict';

    angular.module('app.home', [])
        .config(config)
        .controller('HomeController', HomeController);

    HomeController.$inject = ['authentication', '$http'];
    config.$inject = ['$routeProvider'];

    function HomeController(authentication, $http) {
        var vm = this;

        vm.register = register;
        vm.login = login;
        vm.isAuthenticated = authentication.isAuthenticated();

        function register(user) {
            authentication.register(user)
                .then(
                    function(res) {
                        console.log(res.data);
                        console.log(res);
                    },
                    function(err) {
                        console.log(err);
                });
        }

        function login(user) {
            authentication.login(user)
                .then(
                    function(response) {
                        sessionStorage['authToken'] = response.data.access_token;
                    },
                    function(error) {
                        console.log(err);
                    }
                );
        }
    }

    function config($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controllerAs: 'vm',
            controller: 'HomeController'
        });
    }

}());
