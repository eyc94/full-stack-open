/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const patient = patientService.getPatient(id);
  res.send(patient);
});

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensistivePatientsData());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
