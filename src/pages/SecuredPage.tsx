import React, { FC } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const SecuredPage: FC = () => {
  return (
    <ProtectedRoute>
      <div style={{ width: 1000, height: 1000, backgroundColor: "red" }}>
        Privet!
      </div>
    </ProtectedRoute>
  );
};

export default SecuredPage;
