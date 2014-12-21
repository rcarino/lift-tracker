angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope, Lifts) {
        $scope.lifts = Lifts.getTodaysWorkout();
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

        $scope.update = function (workWeight) {
            $scope.currentLift.setWeight(workWeight);
        }
    })

    .controller('RestCtrl', function ($scope, $state, Lifts) {
        Lifts.finishCurrentSet();
        $scope.$on('timer-stopped', function () {
            $state.go('tab.log_set');
        });
    })

    .controller('DoneCtrl', function ($scope) {

    });
