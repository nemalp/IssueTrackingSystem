(function() {
    'use strict';

    angular
        .module('app.issues')
        .factory('issuesService', issuesService);

    issuesService.$inject = ['$http', 'BASE_URL'];

    function issuesService($http, BASE_URL) {

        var issuesService = {
            getIssueById: getIssueById,
            getIssueComments: getIssueComments
        };

        return issuesService;

        function getIssueById(id) {
            return $http({
                method: 'GET',
                url: BASE_URL + 'issues/' + id,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.authToken
                }
            });
        }

        function getIssueComments(id) {
            return $http({
                method: 'GET',
                url: BASE_URL + 'issues/' + id + '/comments',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.authToken
                }
            });
        }

    }
}());
