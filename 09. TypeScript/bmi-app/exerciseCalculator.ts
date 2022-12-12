// Params
// - Daily exercise hours given as an array (e.g. [3, 0, 2, 4.5, 0, 3, 1]).
// - Target amount of daily hours.

// Calculate
// - Average time of daily exercise hours.
// - Compares this average to the target amount of daily hours.

// Returns
// - Returns object with the following values:
// - (1) The number of days.
// - (2) The number of training days.
// - (3) The original target value.
// - (4) The calculated average time.
// - (5) Boolean value describing if the target was reached.
// - (6) Rating between 1 - 3 that tells how well the hours are met. Decide how to calculate this metric.
// - (7) Text value explaining the rating.
// - Should create a "Result" object by creating an "interface".

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

const calculateExercises = (dailyhours: Array<number>, targetAmount: number): Result => {
  let daysTrained: number = 0;
  let sumOfHoursTrained: number = 0;
  let targetReached: boolean = false;
  let exerciseRating: number = 1;
  let exerciseRatingDescription: string = '';

  dailyhours.forEach(dayHour => {
    if (dayHour > 0) {
      daysTrained++;
    }

    sumOfHoursTrained += dayHour;
  });

  const averageHoursTrained = sumOfHoursTrained / dailyhours.length;

  if (averageHoursTrained < targetAmount) {
    exerciseRating = 1;
    exerciseRatingDescription = 'Did not meet expectations';
  } else if (averageHoursTrained === targetAmount) {
    exerciseRating = 2;
    exerciseRatingDescription = 'Met expectations';
    targetReached = true;
  } else {
    exerciseRating = 3;
    exerciseRatingDescription = 'Exceeded expectations';
    targetReached = true;
  }

  return {
    periodLength: dailyhours.length, // done
    trainingDays: daysTrained, // done.
    success: targetReached, // done.
    rating: exerciseRating, // done.
    ratingDescription: exerciseRatingDescription, // done.
    target: targetAmount, // done.
    average: averageHoursTrained, // done
  };
};

console.log(calculateExercises([1, 0, 2, 4.5, 0, 3, 1, 0, 4], 2));
