importScripts("/libs/face-api.js", "/libs/face-api-monkeypatch.js");

export async function load() {
  console.log("Loading dependencies 🏃‍️");

  await faceapi.nets.mtcnn.loadFromUri("/models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models");

  console.log("Loaded dependencies ✅");
}

export async function analyze(data: ImageBitmap) {
  if (!data) return;

  const canvas = new OffscreenCanvas(data.width, data.height);
  canvas.getContext("2d").drawImage(data, 0, 0);

  const result = await faceapi
    .detectSingleFace(canvas, new faceapi.MtcnnOptions())
    .withFaceLandmarks();

  if (!result) return;

  return result;
}
