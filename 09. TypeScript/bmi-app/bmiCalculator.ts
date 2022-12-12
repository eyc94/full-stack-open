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

console.log(calculateBmi(180.34, 77.1107));
