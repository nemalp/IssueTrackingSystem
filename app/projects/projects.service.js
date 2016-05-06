(function () {
    'use strict';

    angular
        .module('app.projects')
        .factory('projectsService', projectsService);

    projectsService.$inject = ['$http', 'BASE_URL'];

    function projectsService($http, BASE_URL) {

        var projectsService = {
            getAllProjects: getAllProjects
        }

        return projectsService;

        function getAllProjects(params){
            return $http({
                method: 'GET',
                url: BASE_URL + 'projects?filter=&pageSize=' + params.pageSize + '&pageNumber=' + params.pageNumber,
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.authToken
                }
            });
        }
    }
}());
