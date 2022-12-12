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

const calculateExercises = (dailyHours: Array<number>, targetAmount: number): Result => {
  if (dailyHours.length === 0) {
    throw new Error('Daily hours array is empty');
  }

  let daysTrained: number = 0;
  let sumOfHoursTrained: number = 0;
  let targetReached: boolean = false;
  let exerciseRating: number = 1;
  let exerciseRatingDescription: string = '';

  dailyHours.forEach(dayHour => {
    if (dayHour > 0) {
      daysTrained++;
    }

    sumOfHoursTrained += dayHour;
  });

  const averageHoursTrained = sumOfHoursTrained / dailyHours.length;

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
    periodLength: dailyHours.length, // done
    trainingDays: daysTrained, // done.
    success: targetReached, // done.
    rating: exerciseRating, // done.
    ratingDescription: exerciseRatingDescription, // done.
    target: targetAmount, // done.
    average: averageHoursTrained, // done
  };
};



try {
  if (process.argv.length < 3) {
    throw new Error('Missing target and daily exercise hours');
  } else if (process.argv.length < 4) {
    throw new Error('Missing daily exercise hours');
  }
  const targetAmount: number = Number(process.argv[2]);
  const dailyHours: Array<number> = [];
  for (let i = 3; i < process.argv.length; i++) {
    dailyHours.push(Number(process.argv[i]));
  }
  console.log(calculateExercises(dailyHours, targetAmount));
} catch (error: unknown) {
  let errorMessage: string = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
};

// console.log(calculateExercises([1, 0, 2, 4.5, 0, 3, 1, 0, 4], 2));
