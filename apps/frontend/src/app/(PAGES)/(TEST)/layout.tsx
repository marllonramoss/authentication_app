import React, { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

type layoutProps = {
  children: ReactNode;
};

const layout = ({ children }: layoutProps) => {
  return (
    <GoogleOAuthProvider clientId="30822912829-lbf6amkp1d0i3b6u7bv5hb7pbpp95tug.apps.googleusercontent.com">
      <div className="bg-yellow-200">{children}</div>;
    </GoogleOAuthProvider>
  );
};

export default layout;
