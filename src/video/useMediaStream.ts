import { useState } from "react";

export function useMediaStream() {
  const [mediaStream, setMediaStream] = useState(null);

  async function obtainStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { min: 1024, ideal: 1024, max: 1024 },
          height: { min: 576, ideal: 576, max: 576 },
        },
      });
      setMediaStream(stream);
    } catch (e) {
      console.error("Could not obtain stream", e);
    }
  }

  if (!mediaStream) {
    obtainStream();
  }

  return mediaStream;
}
