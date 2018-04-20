(function() {
'use strict';

    angular
        .module('parsefile')
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
            .when('/', {
                templateUrl : 'views/home.client.view.html',
                controller: "ParseFileController"
            })
            .otherwise({
                redirectTo: '/'
            });
        });
})();