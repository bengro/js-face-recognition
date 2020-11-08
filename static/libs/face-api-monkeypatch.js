// https://github.com/justadudewhohacks/face-api.js/issues/47

self.global = {
  Canvas: OffscreenCanvas,
  fetch: fetch,
};

self.Canvas = self.HTMLCanvasElement = OffscreenCanvas;

faceapi.env.setEnv(faceapi.env.createNodejsEnv());

faceapi.env.monkeyPatch({
  Canvas: OffscreenCanvas,
  createCanvasElement: () => {
    return new OffscreenCanvas(480, 270);
  },
});
