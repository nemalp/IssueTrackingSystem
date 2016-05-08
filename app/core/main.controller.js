(function() {
    'use strict';

    angular.module('app.main')
        .config(config)
        .controller('MainController', MainController);

    MainController.$inject = ['$http', '$location', 'authentication'];
    config.$inject = ['$routeProvider'];

    function MainController($http, $location, authentication) {
        var vm = this;

        vm.logout = logout;
        vm.changePassword = changePassword;
        vm.isAuthenticated = authentication.isAuthenticated;

        function logout() {
            authentication.logout()
                .then(
                    function() {
                        sessionStorage.clear();
                        $location.path('/logout');
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }

        function changePassword(user) {
            authentication.changePassword(user)
                .then(
                    function(response) {
                        console.log(response);
                        $location.path('/');
                    },

                    function(error) {
                        console.log(error);
                    }
                );
        }
    }

    function config($routeProvider) {
        $routeProvider
            .when('/profile/password', {
                templateUrl: 'app/core/templates/change-password.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })
    }


}());
