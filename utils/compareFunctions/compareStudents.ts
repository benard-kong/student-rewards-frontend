import { Student } from "../../typeDefs/typeDefs";

const compareTeachers = (studentA: Student, studentB: Student): number => {
  if (studentA.lastName.toLowerCase() < studentB.lastName.toLowerCase()) return -1;
  if (studentA.lastName.toLowerCase() > studentB.lastName.toLowerCase()) return 1;

  if (studentA.firstName.toLowerCase() < studentB.firstName.toLowerCase()) return -1;
  if (studentA.firstName.toLowerCase() > studentB.firstName.toLowerCase()) return 1;

  if (studentA.studentNumber.toLowerCase() < studentB.studentNumber.toLowerCase()) return -1;
  if (studentA.studentNumber.toLowerCase() > studentB.studentNumber.toLowerCase()) return 1;

  return 0;
};

export default compareTeachers;
