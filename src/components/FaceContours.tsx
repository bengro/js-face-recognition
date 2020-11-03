import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  detectSingleFace,
  draw,
  MtcnnOptions,
  resizeResults,
} from "face-api.js";

interface CanvasConfiguration {
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
  const [faceData, setFaceData] = useState(null);

  useEffect(() => {
    videoRef.current.srcObject = props.stream;
  }, [props.stream]);

  const onPlaying = async () => {
    const data = await detectSingleFace(
      videoRef.current,
      new MtcnnOptions()
    ).withFaceLandmarks(true);

    if (data) {
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, configuration.width, configuration.height);

      const resizedResults = resizeResults(data, {
        height: configuration.height,
        width: configuration.width,
      });

      draw.drawFaceLandmarks(canvasRef.current, resizedResults);
    }

    setTimeout(async () => await onPlaying(), configuration.repaintInterval);
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
        ref={videoRef}
        onPlaying={onPlaying}
        width={250}
        height={250}
      >
        <p>This browser does not support the video element.</p>
      </video>
    </>
  );
}
