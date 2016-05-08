(function() {
    'use strict'

    angular.module('app.issues')
        .config(config)
        .controller('IssuesController', IssuesController);

    IssuesController.$inject = ['issuesService', '$routeParams'];
    config.$inject = ['$routeProvider'];

    function IssuesController(issuesService, $routeParams) {
        var vm = this;

        vm.getIssueById = getIssueById($routeParams.id);
        vm.getIssueComments = getIssueComments($routeParams.id);

        function getIssueById(id) {
            issuesService.getIssueById(id)
                .then(
                    function(response) {
                        vm.currentIssue = response.data;

                        vm.currentIssueLabels = [];

                        vm.currentIssue.Labels.forEach(function(label) {
                            vm.currentIssueLabels.push(label.Name);
                        });
                    },

                    function(error) {
                        console.log(error);
                    }
                );
        }

        function getIssueComments(id) {
            issuesService.getIssueComments(id)
                .then(
                    function(response) {
                        vm.issueComments = response.data;
                    },

                    function(error) {
                        console.log(error);
                    }
                );
        }
    }


    function config($routeProvider) {
        $routeProvider
            .when('/issues/:id', {
                templateUrl: 'app/issues/templates/issue-page.html',
                controller: 'IssuesController',
                controllerAs: 'vm'
            })
    }
}());
