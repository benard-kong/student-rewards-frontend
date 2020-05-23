import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import { withApollo } from "../../../apollo/apollo";
import { ALL_NEGATIVE_TRANSACTIONS } from "../../../graphql/transactionQueries";
import { Transaction } from "../../../typeDefs/typeDefs";
import { DATE_FORMAT, DATE_LOCALE } from "../../../fixtures/dateFormat";
import AllTransactionsNav from "../../../components/AllTransactionsNav";

moment.locale(DATE_LOCALE);

const AllNegativeTransactionsPage: React.FC = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(ALL_NEGATIVE_TRANSACTIONS);

  if (error) {
    const msg = error.message;
    if (msg.toLowerCase().includes("not authorised")) router.push("/teacher/login");
    return <h1>Error: {msg}</h1>;
  }
  if (loading) return <h1>Loading...</h1>;

  const { allNegativeTransactions }: { allNegativeTransactions: Transaction[] } = data;

  return (
    <div>
      <AllTransactionsNav />
      <div>
        {allNegativeTransactions.map((transaction) => {
          const date = moment(Number(transaction.createdAt)).format(DATE_FORMAT);

          return (
            <div key={transaction.id}>
              <span>Student: {transaction.studentName}</span>
              <span>Teacher: {transaction.teacherName}</span>
              <span>Points: {transaction.numPoints}</span>
              <span>Date: {date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withApollo({ ssr: true })(AllNegativeTransactionsPage);
