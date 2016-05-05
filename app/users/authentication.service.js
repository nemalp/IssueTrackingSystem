(function() {
    'use strict';

    angular
        .module('app.users')
        .factory('authentication', authentication);

    authentication.$inject = ['$http', '$q', 'BASE_URL'];

    function authentication($http, $q, BASE_URL) {
        var authentication = {
            login: login,
            register: register,
            logout: logout,
            isAdmin: isAdmin,
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
            var loginData = "grant_type=password&username=" + user.email + "&password=" + user.password,
                deferred = $q.defer();

            return $http({
                method: 'POST',
                url: BASE_URL + 'api/Token',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: loginData

            });

        }

        function logout() {
            return $http({
                method: 'POST',
                url: BASE_URL + 'api/Account/Logout',
                headers:{'Authorization': 'Bearer ' + sessionStorage.authToken}
            });
        }

        function isAdmin() {
            if(sessionStorage.currentUser) {
                var user = JSON.parse(sessionStorage.currentUser);

                return user.isAdmin;
            }

        }

        function isAuthenticated() {
            return sessionStorage['authToken'] != undefined;
        }
    }

}());
