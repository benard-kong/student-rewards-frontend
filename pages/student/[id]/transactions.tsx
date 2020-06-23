import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import ContainerCenteredContent from "../../../components/styledComponents/ContainerCenteredContent";
import { withApollo } from "../../../apollo/apollo";
import { FIND_STUDENT } from "../../../graphql/studentQueries";
import { Student, Transaction } from "../../../typeDefs/typeDefs";
import { DATE_FORMAT, DATE_LOCALE } from "../../../fixtures/dateFormat";

moment.locale(DATE_LOCALE);

const earnedPoints = (transactions: Transaction[]): number => {
  let total = 0;
  transactions.forEach((transaction) => {
    if (transaction.numPoints > 0) total += transaction.numPoints;
  });
  return total;
};

const usedPoints = (transactions: Transaction[]): number => {
  let total = 0;
  transactions.forEach((transaction) => {
    if (transaction.numPoints < 0) total += transaction.numPoints;
  });
  return -total;
};

const AllStudentsPage: React.FC = () => {
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const { loading, error, data } = useQuery(FIND_STUDENT, { variables: { studentId: id } });

  if (error) {
    const msg = error.message;
    if (msg.toLowerCase().includes("not authorised")) router.push("/teacher/login");
    return <h1>Error: {msg}</h1>;
  }

  if (loading) return <h1>Loading...</h1>;

  const { findStudent: student }: { findStudent: Student } = data;
  const { transactions } = student;
  const totalEarnedPoints = earnedPoints(transactions);
  const totalUsedPoints = usedPoints(transactions);

  return (
    <ContainerCenteredContent>
      <h1>
        {student.firstName} {student.lastName}
      </h1>
      <h2>Student Number: {student.studentNumber}</h2>
      <h3>Points: {student.numPoints}</h3>
      <h3>Total Points Earned: {totalEarnedPoints}</h3>
      <h3>Total Points Used: {totalUsedPoints}</h3>
      <div>
        {transactions.map((transaction) => {
          const { id: transactionId, numPoints, createdAt } = transaction;
          const date: moment.Moment = moment(Number(createdAt));
          const dateString = date.format(DATE_FORMAT);
          const pointsString =
            numPoints > 0
              ? `Awarded ${numPoints} point${numPoints !== 1 ? "s" : ""}`
              : `Spent ${-numPoints} point${numPoints !== -1 ? "s" : ""}`;
          return <p key={transactionId}>{`${pointsString} on ${dateString}`}</p>;
        })}
      </div>
    </ContainerCenteredContent>
  );
};

export default withApollo({ ssr: true })(AllStudentsPage);
