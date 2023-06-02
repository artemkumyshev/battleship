import React from "react";
import { useStore } from "effector-react";

import { $email } from "@/store/auth";

const HomePage: React.FC = () => {
  const email = useStore($email);

  return <div>Email: {email}</div>;
};

export default HomePage;
