import { Teacher } from "../../typeDefs/typeDefs";

const compareTeachers = (teacherA: Teacher, teacherB: Teacher): number => {
  if (teacherA.lastName.toLowerCase() < teacherB.lastName.toLowerCase()) return -1;
  if (teacherA.lastName.toLowerCase() > teacherB.lastName.toLowerCase()) return 1;

  if (teacherA.firstName.toLowerCase() < teacherB.firstName.toLowerCase()) return -1;
  if (teacherA.firstName.toLowerCase() > teacherB.firstName.toLowerCase()) return 1;

  if (teacherA.email.toLowerCase() < teacherB.email.toLowerCase()) return -1;
  if (teacherA.email.toLowerCase() > teacherB.email.toLowerCase()) return 1;

  if (teacherA.id < teacherB.id) return -1;
  if (teacherA.id > teacherB.id) return 1;

  return 0;
};

export default compareTeachers;
