import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  detectSingleFace,
  draw,
  resizeResults,
  SsdMobilenetv1Options,
  TinyFaceDetectorOptions,
} from "face-api.js";

interface CanvasConfiguration {
  height: number;
  width: number;
  repaintInterval: number;
}

const configuration: CanvasConfiguration = {
  height: 500,
  width: 500,
  repaintInterval: 150,
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

  useEffect(() => {
    if (!faceData) return;

    canvasRef.current
      .getContext("2d")
      .clearRect(0, 0, configuration.width, configuration.height);

    const resizedResults = resizeResults(faceData, {
      height: configuration.height,
      width: configuration.width,
    });

    draw.drawFaceLandmarks(canvasRef.current, resizedResults);
  }, [faceData]);

  const onPlaying = async () => {
    const data = await detect(videoRef);
    setFaceData(data);
    setTimeout(() => onPlaying(), configuration.repaintInterval);
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
        width={100}
        height={100}
      >
        <p>This browser does not support the video element.</p>
      </video>
    </>
  );
}

async function detect(ref: MutableRefObject<HTMLVideoElement>) {
  return detectSingleFace(
    ref.current,
    new SsdMobilenetv1Options({ maxResults: 1, minConfidence: 0.3 })
  ).withFaceLandmarks(true);
}
