import React from "react";
import Video from "../video/Video";
import { useMediaStream } from "../video/useMediaStream";
import "./index.scss";

export default function Index() {
  const mediaStream = useMediaStream();

  return (
    <>
      <div className={"wrapper"}>
        <div className={"container"}>
          <Video stream={mediaStream} />
        </div>
      </div>
    </>
  );
}
