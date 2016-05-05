(function() {
    'use strict';

    angular.module('app.home')
        .config(config)
        .controller('HomeController', HomeController);

    HomeController.$inject = ['authentication', 'usersService', 'homeService', '$http', '$location'];
    config.$inject = ['$routeProvider'];

    function HomeController(authentication, usersService, homeService, $http, $location) {
        var vm = this;

        vm.issuesParams = {
            pageSize: 10,
            pageNumber: 1
        };

        vm.register = register;
        vm.login = login;
        vm.logout = logout;
        vm.isAuthenticated = authentication.isAuthenticated();
        vm.isAdmin = authentication.isAdmin;

        if(vm.isAuthenticated) {
            vm.getUserIssues = getUserIssues();
        }

        function register(user) {
            authentication.register(user)
                .then(
                    function(res) {
                        vm.login({ username: user.username, password: user.password });
                        $location.path('/shouldBeChanged');
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }

        function login(user) {
            authentication.login(user)
                .then(
                    function(response) {
                        sessionStorage['authToken'] = response.data.access_token;
                        usersService.getCurrentUser()
                        .then(
                            function(response) {
                                sessionStorage['currentUser'] = JSON.stringify(response.data);
                            },
                            function(error) {
                                console.log(error);
                            }
                        );
                        $location.path('/shouldBeChanged');
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }

        function logout() {
            authentication.logout()
            .then(
                function() {
                    sessionStorage.clear();
                    $location.path('/shouldBeChanged');
                },
                function(error) {
                    console.log(error);
                }
            );
        }

        function getUserIssues() {
            homeService.getUserIssues(vm.issuesParams)
                .then(
                    function success(response) {
                        vm.userIssues = response.data.Issues;
                        vm.showIssuesPagination = response.data.TotalPages > 1;
                        vm.issuesCount = response.data.TotalPages * vm.issuesParams.pageSize;
                    },
                    function error(err) {
                        notifyService.showError('Cannot load issues at the moment', err);
                    }
                )
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
