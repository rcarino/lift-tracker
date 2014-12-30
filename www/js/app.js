// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'timer', 'ngMaterial'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html"
            })

            .state('app.todays_lifts', {
                url: '/todays_lifts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/todays_lifts/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })

            .state('app.log_set', {
                url: '/log_set',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/todays_lifts/log_set.html',
                        controller: 'LogSetCtrl'
                    }
                }
            })

            .state('app.rest', {
                url: '/rest',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/todays_lifts/rest.html',
                        controller: 'RestCtrl'
                    }
                }
            })

            .state('app.done', {
                url: '/done',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/todays_lifts/done.html',
                        controller: 'DoneCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/todays_lifts');

    });