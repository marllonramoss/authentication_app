import React, { ReactNode } from "react";

type ForceAuthProps = {
  children: ReactNode;
};

const ForceAuth = ({ children }: ForceAuthProps) => {
  return children;
};

export default ForceAuth;
