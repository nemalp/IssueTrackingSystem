(function() {

    function config($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/components/home/home-view.html',
            controller: 'HomeController'
        });
    }

    angular.module('issueTrackingSystem', [
        'ngRoute',
        'ngMessages'
        ])
        // Use [] syntax for minification
        .config(config)
        .controller('HomeController', ['$scope', function($scope) {
            $scope.login = function(user) {
                console.log(user);
            }
        }]);
}());


