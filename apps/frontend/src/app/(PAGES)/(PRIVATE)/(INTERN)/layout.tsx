import ForceAuth from "@/components/shared/ForceAuth";
import React, { ReactNode } from "react";

type layoutProps = {
  children: ReactNode;
};

const layout = ({ children }: layoutProps) => {
  return <ForceAuth>{children}</ForceAuth>;
};

export default layout;
