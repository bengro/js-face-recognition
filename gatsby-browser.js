import React from "react";
import DependenciesProvider from "./src/components/DependenciesProvider";

export const wrapRootElement = ({ element }) => {
  return <DependenciesProvider>{element}</DependenciesProvider>;
};
