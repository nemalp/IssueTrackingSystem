(function() {
    'use strict';

    angular.module('app.home')
        .directive('ngHeader', [function(){
            return {
                restrict: 'A',
                templateUrl: 'app/home/templates/header.html'
            }
        }]);
}());
