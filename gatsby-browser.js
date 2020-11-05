import React from "react";
import DependenciesProvider from "./src/pages/DependenciesProvider";

export const wrapRootElement = ({ element }) => {
  return <DependenciesProvider>{element}</DependenciesProvider>;
};
