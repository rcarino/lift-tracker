angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope, Lifts) {
        $scope.lifts = Lifts.getToday();
    })

    .controller('FriendsCtrl', function ($scope, Friends) {
        $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function ($scope) {
    })

    .controller('LogSetCtrl', function ($scope, Lifts, $state) {
        $scope.currentLift = Lifts.getCurrentLift();
        if (!$scope.currentLift) {
            $state.go('tab.done');
        }
    })

    .controller('RestCtrl', function ($scope, $state) {
        $scope.$on('timer-stopped', function () {
            $state.go('tab.log_set');
        });
    })

    .controller('DoneCtrl', function ($scope) {

    });
