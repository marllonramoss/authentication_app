import { AuthProvider } from "@/contexts/AuthContext";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default layout;
