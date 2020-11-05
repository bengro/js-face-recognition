import { FaceApiWorker } from "./analyzeFrame";

export const faceApiWorker = typeof window === "object" && new FaceApiWorker();
