(function() {
    'use strict';

    angular
        .module('app.users.authentication', [])
        .factory('authentication', authentication);

    authentication.$inject = ['$http', 'BASE_URL'];

    function authentication($http, BASE_URL) {
        var authentication = {
            login: login,
            register: register,
            logout: logout,
            isAuthenticated: isAuthenticated
        };

        return authentication;

        function register(user) {

            return $http({
                method: 'POST',
                url: BASE_URL + 'api/Account/Register',
                headers: { 'Content-Type': 'application/json' },
                data: user,

            });
        }

        function login(user) {
            var loginData = "grant_type=password&username=" + user.email + "&password=" + user.password;

            return $http({
                method: 'POST',
                url: BASE_URL + 'api/Token',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: loginData
            });
        }

        function logout() {}

        function isAuthenticated() {
            return sessionStorage['authToken'] !== undefined;
        }
    }

}());
