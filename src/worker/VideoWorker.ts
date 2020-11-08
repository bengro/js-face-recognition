// @ts-ignore
import Worker from "./video.worker";

const worker = typeof window === "object" && new Worker();

export default worker;
