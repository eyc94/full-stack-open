import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  const isValidParameters: boolean = !isNaN(Number(height)) && !isNaN(Number(weight));

  const bmi: string = calculateBmi(Number(height), Number(weight));

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({
      error: 'parameters missing',
    });
  }

  const result = calculateExercises(daily_exercises, target);
  res.send(result);
});

const PORT: number = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
