angular.module('starter.services', [])

    .factory('$localstorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key, defaultValue) {
                if (!defaultValue) {
                    defaultValue = {};
                }
                var value = $window.localStorage[key]
                return value ? JSON.parse(value) : defaultValue;
            }
        }
    }])

    .factory('Lifts', ['$localstorage', function ($localstorage) {
        var SQUATS = 'Squats',
            BENCH_PRESSES = 'Bench Presses',
            DEADLIFTS = 'Deadlifts',
            OVERHEAD_PRESSES = 'Overhead Presses',
            POWER_CLEANS = 'Power Cleans';

        function Lift(type, reps, sets) {
            var weights = [45, 35, 25, 10, 5, 2.5, 1.25];

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

            return {
                type: type,
                reps: reps,
                sets: sets,
                setWeight: function (weight) {
                    this.weight = weight;
                    this.platesPerSide = getPlatesPerSide(weight).join(', ');
                    $localstorage.setObject(this.type, this);
                }
            }
        };

        var squats = $localstorage.getObject(SQUATS, Lift(SQUATS, 5, 3)),
            benchPresses = $localstorage.getObject(BENCH_PRESSES, Lift(BENCH_PRESSES, 5, 3)),
            deadlifts = $localstorage.getObject(DEADLIFTS, Lift(DEADLIFTS, 5, 1)),
            overheadPresses = $localstorage.getObject(OVERHEAD_PRESSES, Lift(OVERHEAD_PRESSES, 5, 3)),
            powerCleans = $localstorage.getObject(POWER_CLEANS, Lift('Power Cleans', 3, 5)),

            workoutA = [squats, benchPresses, deadlifts],
            workoutB = [squats, overheadPresses, powerCleans],

            currentWorkout = {};

        function initializeService() {
            currentWorkout.currentLift = 0;
            currentWorkout.currentSet = 1;

            var lastWorkout = $localstorage.get('lastWorkout', 'B');

            currentWorkout.type = (lastWorkout === 'B') ? 'A' : 'B';
            currentWorkout.lifts = (lastWorkout === 'B') ? workoutA : workoutB;
        }

        initializeService();

        return {
            getTodaysWorkout: function () {
                return currentWorkout.lifts;
            },

            getCurrentLift: function () {
                if (currentWorkout.currentLift >= currentWorkout.lifts.length) {
                    return null;
                }
                var currentLift = currentWorkout.lifts[currentWorkout.currentLift];

                return currentLift;
            },

            // Unsafe to call if today's workout has been finished
            finishCurrentSet: function () {
                currentWorkout.currentSet += 1;
                if (currentWorkout.currentSet > this.getCurrentLift().sets) {
                    currentWorkout.currentLift += 1;
                    currentWorkout.currentSet = 1;
                }
            },

            finishTodaysWorkout: function () {
                $localstorage.set('lastWorkout', currentWorkout.type);

                // JSONified objects don't persist their methods must apply manually
                var setWeightFn = Lift().setWeight;
                _.forEach(currentWorkout.lifts, function (lift) {
                    setWeightFn.call(lift, lift.weight + 5);
                });
                initializeService();
            }
        }
    }
    ]);