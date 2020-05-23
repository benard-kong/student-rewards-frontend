import React from "react";
import Link from "next/link";

const AllTransactionsNav: React.FC = () => (
  <div>
    <Link href="/transaction/all" passHref>
      <a>All Transactions</a>
    </Link>
    <Link href="/transaction/all/positive" passHref>
      <a>All Points Awarded Transactions</a>
    </Link>
    <Link href="/transaction/all/negative" passHref>
      <a>All Points Used Transactions</a>
    </Link>
  </div>
);

export default AllTransactionsNav;
