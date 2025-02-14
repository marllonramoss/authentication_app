import { AuthProvider } from "@/contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="30822912829-lbf6amkp1d0i3b6u7bv5hb7pbpp95tug.apps.googleusercontent.com">
        {children}
      </GoogleOAuthProvider>
    </AuthProvider>
  );
};

export default layout;
