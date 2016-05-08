(function() {
    'use strict';

    angular
        .module('app.users')
        .factory('authentication', authentication);

    authentication.$inject = ['$http', '$q', 'BASE_URL', 'usersService'];

    function authentication($http, $q, BASE_URL, usersService) {
        var authentication = {
            login: login,
            register: register,
            logout: logout,
            isAdmin: isAdmin,
            isAuthenticated: isAuthenticated,
            changePassword: changePassword
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

        function changePassword(user) {
            var currentUser = sessionStorage.authToken,
                data = 'OldPassword=' + user.oldPassword + '&NewPassword=' + user.newPassword + '&ConfirmPassword=' + user.newPasswordConfirm;
            return $http({
                method: 'POST',
                url: BASE_URL + 'api/Account/ChangePassword',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + currentUser
                }
            });
        }
    }

}());
