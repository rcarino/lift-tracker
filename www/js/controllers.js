angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope, Lifts) {
        $scope.lifts = Lifts.getTodaysWorkout();
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

    .controller('DoneCtrl', function ($scope, Lifts) {
        Lifts.finishTodaysWorkout();
    });
