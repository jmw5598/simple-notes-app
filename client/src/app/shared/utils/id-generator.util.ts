export function* getIdGenerator() {
  let id: number = (new Date()).getTime();
  while (true) {
    yield id++;
  }
}

export const idGenerator: Generator = getIdGenerator();
