(function() {
    'use strict';

    angular.module('issueTrackingSystem.home', [])
        .config(config)
        .controller('HomeController', HomeController);

    HomeController.$inject = ['authentication', '$http'];
    config.$inject = ['$routeProvider'];

    function HomeController(authentication, $http) {
        var vm = this;

        vm.register = register;
        vm.login = login;

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
                    function(res) {
                        console.log(res);
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }
    }

    function config($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/components/home/home-view.html',
            controllerAs: 'vm',
            controller: 'HomeController'
        });
    }

}());
