import patientsData from '../../data/patients';
import { Patient, NewPatient } from '../types';
import { NonSensitivePatientData } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<Patient> => {
  return patientsData;
};

const getNonSensistivePatientsData = (): Array<NonSensitivePatientData> => {
  return patientsData.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const newPatient = { id: uuid(), ...entry };
  patientsData.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensistivePatientsData, addPatient };
