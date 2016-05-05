(function () {
    'use strict';

    angular
        .module('app.home')
        .factory('homeService', homeService);

    homeService.$inject = ['$http', 'BASE_URL'];

    function homeService($http, BASE_URL) {

        var homeService = {
            getUserIssues: getUserIssues
        }

        return homeService;

        function getUserIssues(pageParams){
            return $http({
                method: 'GET',
                url: BASE_URL + 'issues/me?orderBy=DueDate desc&pageSize=' + pageParams.pageSize + '&pageNumber=' + pageParams.pageNumber,
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.authToken
                }
            });
        }
    }
}());
