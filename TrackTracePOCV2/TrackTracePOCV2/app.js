(function () {

    'use strict';



    angular

        .module('app', ['ngRoute', 'ngCookies'])

        .config(config)

        .run(run);



    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {

        $routeProvider

        .when('/', {

                controller: 'HomeCtrl',

                templateUrl: 'app-view/home.view.html'/*,

                controllerAs: 'vm'*/

            })

	    .when('/login', {

                controller: 'LoginCtrl',

                templateUrl: 'app-view/login.view.html'/*,

                controllerAs: 'vm'*/

            })



            .when('/register', {

                controller: 'RegisterCtrl',

                templateUrl: 'app-view/register.view.html'/*,

                controllerAs: 'vm'*/

            })

    .when('/wrkList', {
 
                controller: 'WorkerCtrl',
 
                templateUrl: 'app-view/wrkList.view.html'
            })

            .when('/createWrk', {
         
        controller: 'CreateWrkCtrl',

        templateUrl: 'app-view/createWkr.view.html'
            
    })
     .when('/toolList', {
 
                controller: 'ToolCtrl',
 
                templateUrl: 'app-view/toolList.view.html'
            })
            
          
            .otherwise({ redirectTo: '/' });

    }



    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];

    function run($rootScope, $location, $cookieStore, $http) {

        // keep user logged in after page refresh

        $rootScope.globals = $cookieStore.get('globals') || {};

        if ($rootScope.globals.currentUser) {

            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line

        }



        $rootScope.$on('$locationChangeStart', function (event, next, current) {

            // redirect to login page if not logged in and trying to access a restricted page

            var restrictedPage = $.inArray($location.path(), ['/login', '/register','/wrkList','/createWrk','/toolList']) === -1;

            var loggedIn = $rootScope.globals.currentUser;

            if (restrictedPage && !loggedIn) {

                $location.path('/');

            }

        });

    }



})();