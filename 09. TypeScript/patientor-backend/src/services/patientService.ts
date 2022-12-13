import patientsData from '../../data/patients';
import { Patient, NewPatient, NonSensitivePatientData } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<Patient> => {
  return patientsData;
};

const getPatient = (id: string): NonSensitivePatientData | undefined => {
  return patientsData.find(patient => patient.id === id);
};

const getNonSensistivePatientsData = (): Array<NonSensitivePatientData> => {
  return patientsData.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const newPatient = { id: uuid(), ...patient, entries: [] };
  patientsData.push(newPatient);
  return newPatient;
};

export default { getPatient, getPatients, getNonSensistivePatientsData, addPatient };
