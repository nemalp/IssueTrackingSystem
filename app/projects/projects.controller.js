(function() {
    'use strict';

    angular.module('app.projects')
        .config(config)
        .controller('ProjectsContoller', ProjectsContoller);

    ProjectsContoller.$inject = ['$http', '$location', '$routeParams', 'projectsService', 'authentication'];
    config.$inject = ['$routeProvider'];

    function ProjectsContoller($http, $location, $routeParams, projectsService, authentication) {
        var vm = this;

        vm.getAllProjects = getAllProjects;
        vm.addProject = addProject;
        vm.isAuthenticated = authentication.isAuthenticated();
        vm.isAdmin = authentication.isAdmin;

        vm.projectsParams = {
            pageSize: 5,
            pageNumber: 1
        };

        vm.usersDataSource = {
            transport: {
                read: {
                    url: "http://softuni-issue-tracker.azurewebsites.net/users/",
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken
                    }
                }
            }
        };

        if(vm.isAuthenticated) {
            getAllProjects();
        }

        function getAllProjects() {
            projectsService.getAllProjects(vm.projectsParams)
                .then(function success(response) {
                    vm.allProjects = response.data.Projects;
                    vm.projectsCount = response.data.TotalPages * vm.projectsParams.pageSize;

                }, function error(err) {
                    console.log(err);
                });
        }

        function addProject(project) {
            projectsService.addProject(project)
                .then(
                    function(response) {
                        console.log(response);
                        $location.path('projects/' + response.data.Id);
                    },

                    function(error) {
                        console.log(error);
                    }
                );
        }
    }

    function config($routeProvider) {
        $routeProvider
        .when('/projects', {
            templateUrl: 'app/projects/templates/allProjects.html',
            controller: 'ProjectsContoller',
            controllerAs: 'vm'
        })

        .when('/projects/add', {
            templateUrl: 'app/projects/templates/addProject.html',
            controller: 'ProjectsContoller',
            controllerAs: 'vm'
        })

        .when('/projects/:id', {
            templateUrl: 'app/projects/templates/project-page.html',
            controller: 'ProjectsContoller',
            controllerAs: 'vm'
        });
    }


}());
