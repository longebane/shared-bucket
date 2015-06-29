'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('FIREBASE_URL', 'https://gz-angularfire-test.firebaseio.com/')
  .factory('dataService', ['FIREBASE_URL', function(FIREBASE_URL) {
    var dataReference = new Firebase(FIREBASE_URL);

    return dataReference;
  }])
  .factory('partyService', ['$firebaseArray', 'FIREBASE_URL', 'dataService',
    function($firebaseArray, FIREBASE_URL, dataService) {
    var parties = $firebaseArray(dataService.child('parties'));


    var partyServiceObject = {
      parties: parties,
      saveParty: function(party, userid) {
        var user = $firebaseArray(dataService.child('users').child(userid));
        user.$add(party);
      }
    };

    return partyServiceObject;
  }])
  .factory('authService', ['$rootScope', '$firebaseAuth', 'FIREBASE_URL', 'dataService',
    function($rootScope, $firebaseAuth, FIREBASE_URL, dataService) {
    var firebaseAuthObject = $firebaseAuth(dataService);

    $rootScope.currentUser = null;

    firebaseAuthObject.$onAuth(function(currentUser) {
      $rootScope.currentUser = currentUser;
    });

    var authServiceObject = {
      register: function(user) {
        return firebaseAuthObject.$createUser(user);
      },
      login: function(user) {
        return firebaseAuthObject.$authWithPassword(user);
      },
      logout: function() {
        firebaseAuthObject.$unauth();
      },
      getCurrentUser: function() {
        return $rootScope.currentUser.uid;
      }
    };

    return authServiceObject;
  }])
  .factory('textMessageService', ['$firebaseArray', 'FIREBASE_URL', 'partyService', 'dataService',
    function($firebaseArray, FIREBASE_URL, partyService, dataService) {
    var textMessages = $firebaseArray(dataService.child('textMessages'));

    var textMessageServiceObject = {
      sendTextMessage: function(party) {
        var newTextMessage = {
          phoneNumber: party.phone,
          size: party.size,
          name: party.name
        };
        textMessages.$add(newTextMessage);
        party.notified = true;
        partyService.parties.$save(party);
      }
    };

    return textMessageServiceObject;
  }]);
