const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100.0;
  const heightSquared = heightInMeters * heightInMeters;
  const bodyMassIndex = weight / heightSquared;

  let classification: string;

  if (bodyMassIndex < 16.0) {
    classification = 'Underweight (Severe thinness)';
  } else if (bodyMassIndex < 16.9) {
    classification = 'Underweight (Moderate thinness)';
  } else if (bodyMassIndex < 18.4) {
    classification = 'Underweight (Mild thinness)';
  } else if (bodyMassIndex < 24.9) {
    classification = 'Normal (Healthy weight)';
  } else if (bodyMassIndex < 29.9) {
    classification = 'Overweight (Pre-obese)';
  } else if (bodyMassIndex < 34.9) {
    classification = 'Obese (Class I)';
  } else if (bodyMassIndex < 39.9) {
    classification = 'Obese (Class II)';
  } else {
    classification = 'Obese (Class III)';
  }
  return classification;
};

try {
  if (process.argv.length < 3) {
    throw new Error('Missing height and weight');
  } else if (process.argv.length < 4) {
    throw new Error('Missing weight');
  } else if (process.argv.length > 4) {
    throw new Error('Too many arguments');
  }
  const height: number = Number(process.argv[2]);
  const weight: number = Number(process.argv[3]);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage: string = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
};

// console.log(calculateBmi(180.34, 77.1107));
