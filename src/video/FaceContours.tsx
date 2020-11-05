import React, { MutableRefObject, useEffect, useRef } from "react";
import { faceApiWorker } from "../worker/FaceApiWorker";
import { extractFrame } from "./extractFrame";
import { draw } from "face-api.js";

export interface CanvasConfiguration {
  height: number;
  width: number;
  repaintInterval: number;
}

const configuration: CanvasConfiguration = {
  height: 600,
  width: 960,
  repaintInterval: 0,
};

interface Props {
  stream: MediaStream;
}

export default function FaceContours(props: Props) {
  const videoRef: MutableRefObject<HTMLVideoElement> = useRef(null);
  const canvasRef: MutableRefObject<HTMLCanvasElement> = useRef(null);

  useEffect(() => {
    async function load() {
      await faceApiWorker.load();
    }

    load();
  });

  useEffect(() => {
    videoRef.current.srcObject = props.stream;
  }, [props.stream]);

  const onPlaying = async () => {
    const data = await faceApiWorker.analyzeFrame(
      extractFrame(videoRef),
      configuration
    );

    console.log("Worker returned data:", data);

    if (data) {
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, configuration.width, configuration.height);

      draw.drawFaceLandmarks(canvasRef.current, data);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        height={configuration.height}
        width={configuration.width}
      />
      <video
        autoPlay
        controls={true}
        ref={videoRef}
        onPlaying={onPlaying}
        onPause={onPlaying}
        width={250}
        height={250}
      >
        <p>This browser does not support the video element.</p>
      </video>
    </>
  );
}
