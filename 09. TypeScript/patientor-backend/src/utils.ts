import { Gender, NewPatient } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseEntry = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error('Incorrect or missing value: ' + value);
  }
  return value;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseEntry(object.name),
    ssn: parseEntry(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseEntry(object.occupation),
    gender: parseGender(object.gender),
  };
  return newEntry;
};

export default toNewPatient;
