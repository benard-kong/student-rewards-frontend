export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  studentNumber: string;
  numPoints: number;
  transactions: Transaction[];
};

export type Transaction = {
  id: string;
  numPoints: number;
  createdAt: Date;
  studentName: string;
  teacherName: string;
};
