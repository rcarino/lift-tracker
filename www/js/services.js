angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('Friends', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var friends = [
            {id: 0, name: 'Scruff McGruff'},
            {id: 1, name: 'G.I. Joe'},
            {id: 2, name: 'Miss Frizzle'},
            {id: 3, name: 'Ash Ketchum'}
        ];

        return {
            all: function () {
                return friends;
            },
            get: function (friendId) {
                // Simple index lookup
                return friends[friendId];
            }
        }
    })

    .factory('Lifts', function () {
        var lifts = [
                {type: 'Squats', reps: 5, sets: 3, weight: 265},
                {type: 'Bench Presses', reps: 5, sets: 3, weight: 185},
                {type: 'Deadlifts', reps: 5, sets: 1, weight: 300}
            ],

            weights = [45, 35, 25, 10, 5, 2.5, 1.25],

            squats = {type: 'Squats', reps: 5, sets: 3},
            benches = {type: 'Bench Presses', reps: 5, sets: 3},
            deadlifts = {type: 'Deadlifts', reps: 5, sets: 1},
            overheadPresses = {type: 'Overhead Presses', reps: 5, sets: 3},
            cleans = {type: 'Power Cleans', reps: 3, sets: 5};

            //workoutA = ;

        function getPlatesPerSide(weight) {
            var halfWithoutBar = (weight - 45) / 2,
                oneSide = [],
                currentWeight = 0;

            _.forEach(weights, function (weight) {
                if (currentWeight === halfWithoutBar) {
                    return;
                }

                while (currentWeight + weight <= halfWithoutBar) {
                    currentWeight += weight;
                    oneSide.push(weight);
                }
            });

            return oneSide;
        }

        _.forEach(lifts, function (liftObj) {
            liftObj.platesPerSide = getPlatesPerSide(liftObj.weight);
            liftObj.formattedPlatesPerSide = liftObj.platesPerSide.join(', ');
        });

        return {
            getToday: function () {
                return lifts;
            },

            getCurrentLift: function () {
                if (lifts.length === 0) {
                    return null;
                }

                var currentLift = lifts[0],
                    currentSet = currentLift.currentSet;

                currentLift.currentSet = currentSet ? currentSet + 1 : 1

                if (currentLift.currentSet >= currentLift.sets) {
                    lifts.shift();
                }

                return currentLift;
            }
        }
    });
