import { CanvasConfiguration } from "../video/FaceContours";
import { detectSingleFace, MtcnnOptions, resizeResults } from "face-api.js";
import { nets } from "face-api.js/build/es6";

export class FaceApiWorker {
  async load() {
    await nets.mtcnn.loadFromUri("models");
    await nets.faceLandmark68TinyNet.loadFromUri("models");

    console.log("Loaded dependencies ✅");
  }

  async analyzeFrame(
    videoFrame: ImageBitmap,
    configuration: CanvasConfiguration
  ) {
    const canvas = document.createElement("canvas");
    canvas.height = configuration.height;
    canvas.width = configuration.width;
    canvas.getContext("2d").drawImage(videoFrame, 0, 0);

    const data = await detectSingleFace(
      canvas,
      new MtcnnOptions()
    ).withFaceLandmarks(true);

    console.log("Loaded landmarks ...", { data });

    if (data) {
      return resizeResults(data, {
        height: configuration.height,
        width: configuration.width,
      });
    }
  }
}
