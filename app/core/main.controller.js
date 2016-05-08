(function() {
    'use strict';

    angular.module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', '$location', 'authentication'];

    function MainController($http, $location, authentication) {
        var vm = this;

        vm.logout = logout;
        vm.isAuthenticated = authentication.isAuthenticated;

        function logout() {
            authentication.logout()
                .then(
                    function() {
                        sessionStorage.clear();
                        $location.path('/');
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }
    }


}());
