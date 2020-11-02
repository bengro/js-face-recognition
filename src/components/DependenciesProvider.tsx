import React, { ReactChildren, useState } from "react";
import { nets } from "face-api.js/build/es6";

interface Props {
  children: ReactChildren;
}

export default function DependenciesProvider(props: Props) {
  const [loaded, setLoaded] = useState(false);

  async function load() {
    await nets.faceLandmark68TinyNet.loadFromUri("models");
    await nets.ssdMobilenetv1.loadFromUri("models");
    await nets.tinyFaceDetector.loadFromUri("models");

    setLoaded(true);
  }

  load();

  if (loaded) {
    return props.children;
  } else {
    return <div>Loading...</div>;
  }
}
