export const asyncSleep = (ms: number) =>
  new Promise((res) => setTimeout(res, ms))
