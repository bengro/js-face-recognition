import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import worker from "../worker/VideoWorker";
import { draw, resizeResults } from "face-api.js";
import { drawFaceLandmarks } from "face-api.js/build/es6/draw";

export interface CanvasConfiguration {
  height: number;
  width: number;
  repaintInterval: number;
}

const configuration: CanvasConfiguration = {
  height: 256,
  width: 256,
  repaintInterval: 0,
};

interface Props {
  stream: MediaStream;
}

export default function FaceContours(props: Props) {
  const videoRef: MutableRefObject<HTMLVideoElement> = useRef(null);
  const canvasRef: MutableRefObject<HTMLCanvasElement> = useRef(null);
  const [landmarks, setLandmarks] = useState([]);

  useEffect(() => {
    videoRef.current.srcObject = props.stream;
  }, [props.stream]);

  useEffect(() => {
    canvasRef.current
      .getContext("2d")
      .clearRect(0, 0, configuration.width, configuration.height);

    landmarks.forEach((landmark) => {
      canvasRef.current
        .getContext("2d")
        .fillRect(landmark._x, landmark._y, 5, 5);
    });
  }, [landmarks]);

  const renderCanvas = () => {
    (async function render() {
      const tempCanvas = new OffscreenCanvas(
        configuration.width,
        configuration.height
      );
      tempCanvas.getContext("2d").drawImage(videoRef.current, 0, 0);
      const bitmap = tempCanvas.transferToImageBitmap();

      const result = await worker.analyze(bitmap);
      if (result) {
        setLandmarks(result.landmarks._positions);
      }

      setTimeout(await render, 1000 / 300);
    })();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        height={configuration.height}
        width={configuration.width}
      />
      <video
        style={{ display: "none" }}
        autoPlay
        onPlay={renderCanvas}
        controls={true}
        ref={videoRef}
        width={configuration.height}
        height={configuration.height}
      />
    </>
  );
}
