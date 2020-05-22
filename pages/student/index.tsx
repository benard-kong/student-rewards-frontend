import React from "react";
import { useRouter } from "next/router";

const RootStudentPage: React.FC = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/student/all");
  }, [router]);

  return <div />;
};

export default RootStudentPage;
