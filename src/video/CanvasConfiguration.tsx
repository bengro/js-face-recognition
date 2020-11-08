export interface CanvasConfiguration {
  height: number;
  width: number;
  repaintInterval: number;
}

export const configuration: CanvasConfiguration = {
  height: 256,
  width: 256,
  repaintInterval: 0,
};
