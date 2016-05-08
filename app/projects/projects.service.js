(function () {
    'use strict';

    angular
        .module('app.projects')
        .factory('projectsService', projectsService);

    projectsService.$inject = ['$http', 'BASE_URL'];

    function projectsService($http, BASE_URL) {

        var projectsService = {
            getAllProjects: getAllProjects,
            addProject: addProject,
            getProjectById: getProjectById,
            getProjectIssues: getProjectIssues
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

        function addProject(project) {
            var labels = project.labels.split(',');
            var dataLabels = '';
            var dataPriorities = '';
            var priorities = project.priorities.split(',');

            labels.forEach(function(l, index) {
                dataLabels += '&labels[' + index + '].Name=' + l.trim();
            });

            priorities.forEach(function(p, index) {
                dataPriorities += '&priorities[' + index + '].Name=' + p.trim();
            });

            return $http({
                method: 'POST',
                url: BASE_URL + 'projects',
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.authToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'Name=' + project.name +'&Description=' + project.description +'&ProjectKey=' + project.key + dataLabels + dataPriorities +
                    '&LeadId=' + project.leadId
            });
        }

        function getProjectById(projectId) {
            return $http({
                method: 'GET',
                url: BASE_URL + 'projects/' + projectId,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.authToken
                }
            });
        }

        function getProjectIssues(projectId) {
            return $http({
                url: BASE_URL + 'projects/' + projectId + '/issues',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.authToken
                }
            });
        }
    }
}());
