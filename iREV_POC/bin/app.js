(function () {

    'use strict';



    angular

        .module('app', ['ngRoute', 'ngCookies'])

        .config(config);

      /*  .run(run);*/



    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {

        $routeProvider

        .when('/', {

                controller: 'HomeCtrl',

                templateUrl: 'app-view/home.view.html'/*,

                controllerAs: 'vm'*/

            })

	    .when('/backlog', {

                controller: 'BacklogCtrl',

                templateUrl: 'app-view/backlog.view.html'/*,

                controllerAs: 'vm'*/

            })
            .otherwise({ redirectTo: '/' });

    }


/*
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];*/

})();