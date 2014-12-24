angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope, Lifts) {
        $scope.lifts = Lifts.getTodaysWorkout();
    })

    .controller('LogSetCtrl', function ($scope, Lifts, $state, $mdToast) {
        $scope.currentLift = Lifts.getCurrentLift();
        if (!$scope.currentLift) {
            $state.go('tab.done');
        }

        $scope.repRange = _.range(1, $scope.currentLift.reps + 1);

        $scope.update = function (workWeight) {
            if (workWeight % 2.5 === 0) {
                $scope.currentLift.setWeight(workWeight);
            } else {
                $mdToast.show($mdToast.simple()
                    .content('Impossible plate configuration. You must enter a number divisible by 2.5')
                    .position('top')
                );
            }
        }

        $scope.logSet = function(loggedReps) {
            if (!loggedReps) {
                loggedReps = 0;
            }
            Lifts.finishCurrentSet(loggedReps);
            $state.go('tab.rest');
        }
    })

    .controller('RestCtrl', function ($scope, $state, Lifts) {
        $scope.$on('timer-stopped', function () {
            $state.go('tab.log_set');
        });
    })

    .controller('DoneCtrl', function ($scope, Lifts) {
        Lifts.finishTodaysWorkout();
    });
