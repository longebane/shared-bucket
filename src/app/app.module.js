(function() {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'app.waitList',
      'app.auth',
      'app.services',
      'app.controllers',
      'firebase'
    ])
    .run(appRun)
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
          templateUrl: 'partials/landing_page.html',
          controller: 'LandingPageController'
        });
        $routeProvider.when('/register', {
          templateUrl: 'partials/register.html',
          controller: 'AuthController',
          controllerAs: 'authController'
        });
        $routeProvider.when('/login', {
          templateUrl: 'partials/login.html',
          controller: 'AuthController',
          controllerAs: 'authController'
        });
        $routeProvider.otherwise({
          redirectTo: '/'
        });
      }]);

  appRun.$inject = ['$rootScope', '$location'];

  function appRun($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
      if (error === "AUTH_REQUIRED") {
        $location.path('/');
      }
    });
  }

})();