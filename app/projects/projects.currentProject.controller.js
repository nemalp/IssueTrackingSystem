(function() {
    'use strict';

    angular.module('app.projects')
        .config(config)
        .controller('CurrentProjectContoller', CurrentProjectContoller);

    CurrentProjectContoller.$inject = ['$http', '$routeParams', 'projectsService'];
    config.$inject = ['$routeProvider'];

    function CurrentProjectContoller($http, $routeParams, projectsService) {
        var vm = this;

        vm.getProjectById = getProjectById($routeParams.id);
        vm.getProjectIssues = getProjectIssues($routeParams.id);

        function getProjectById(projectId) {
            projectsService.getProjectById(projectId)
                .then(
                    function(response) {
                        vm.currentProject = response.data;

                        vm.currentProjectLabels = [];
                        vm.currentProjectPriorities = [];

                        vm.currentProject.Labels.forEach(function(label) {
                            vm.currentProjectLabels.push(label.Name);
                        });

                        vm.currentProject.Priorities.forEach(function(priority) {
                            vm.currentProjectPriorities.push(priority.Name);
                        });

                    },

                    function(error) {
                        console.log(error);
                    }
                );
        }

        function getProjectIssues(projectId) {
            projectsService.getProjectIssues(projectId)
                .then(
                    function(response) {
                        vm.currentProjectIssues = response.data;
                        vm.currentProjectIssuesAssignees = [];
                        vm.currentProjectIssuesPriorities = [];

                        // vm.currentProjectIssues.forEach(function(issue) {
                        //
                        // if(vm.currentProjectIssuesAssignees.indexOf(issue.Assignee.Username) === -1) {
                        //     vm.currentProjectIssuesAssignees.push(issue.Assignee.Username);
                        // }
                        //
                        // if(vm.currentProjectIssuesPriorities.indexOf(issue.Priority.Name) === -1) {
                        //     vm.currentProjectIssuesPriorities.push(issue.Priority.Name);
                        // }
                        //
                        // });

                    },

                    function(error) {
                        console.log(error);
                    }
                );
        }
    }

    function config($routeProvider) {
        $routeProvider
        .when('/projects/:id', {
            templateUrl: 'app/projects/templates/project-page.html',
            controller: 'CurrentProjectContoller',
            controllerAs: 'vm'
        });
    }


}());
