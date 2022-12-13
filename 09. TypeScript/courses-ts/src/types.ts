interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface Descripton extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends Descripton {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends Descripton {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends Descripton {
  type: 'special',
  requirements: ['nodejs', 'jest'],
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
