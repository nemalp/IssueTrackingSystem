(function() {
    'use strict';

    angular.module('app.projects')
        .config(config)
        .controller('ProjectsContoller', ProjectsContoller);

    ProjectsContoller.$inject = ['$http', '$location', 'projectsService', 'authentication'];
    config.$inject = ['$routeProvider'];

    function ProjectsContoller($http, $location, projectsService, authentication) {
        var vm = this;

        vm.isAuthenticated = authentication.isAuthenticated();

        vm.projectsParams = {
            pageSize: 5,
            pageNumber: 1
        };

        if(vm.isAuthenticated) {
            vm.getAllProjects = getAllProjects();
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

    }

    function config($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'app/projects/templates/allProjects.html',
            controller: 'ProjectsContoller',
            controllerAs: 'vm'
        });
    }


}());
