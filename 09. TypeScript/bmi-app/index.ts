import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  const isValidParameters: boolean = !isNaN(Number(height)) && !isNaN(Number(weight));

  const bmi = calculateBmi(Number(height), Number(weight));

  if (!height || !weight || !isValidParameters) {
    res.status(400).send({
      error: 'Malformatted parameters',
    });
  }

  res.send({
    weight: weight,
    height: height,
    bmi: bmi,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
