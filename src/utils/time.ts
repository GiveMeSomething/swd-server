export const getUnixTs = (): number => {
  return new Date().getTime() / 1000;
};

export const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
