import React, { ReactChildren, useState } from "react";
import worker from "../worker/VideoWorker";

interface Props {
  children: ReactChildren;
}

export default function DependenciesProvider(props: Props) {
  const [loaded, setLoaded] = useState(false);

  async function load() {
    await worker.load();
    setLoaded(true);
    console.log("Library loaded ✅");
  }

  load();

  if (loaded) {
    return props.children;
  } else {
    return <div>Loading...</div>;
  }
}
