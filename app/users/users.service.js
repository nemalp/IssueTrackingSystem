(function() {
    'use strict';

    angular
        .module('app.users')
        .factory('usersService', usersService);

    usersService.$inject = ['$http', 'BASE_URL'];

    function usersService($http, BASE_URL) {

        var userService = {
            getCurrentUser: getCurrentUser
        };

        return userService;

        function getCurrentUser() {
            return $http({
                method: 'GET',
                url: BASE_URL + 'users/me',
                headers: { 'Authorization': 'Bearer ' + sessionStorage.authToken }
            });
        }

    }
}());
