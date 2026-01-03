class SagaUtilsSingleton {
  getRandomUInt8Or128 = () => {
    if (typeof window !== 'undefined' && typeof window.crypto !== 'undefined') {
      return window.crypto.getRandomValues(new Uint8Array(1))[0];
    }
    return 128;
  };

  getRandom = (minBound: number, maxBound: number) => {
    const gen = this.getRandomUInt8Or128();
    return Math.round((gen / 256) * (maxBound - minBound)) + minBound;
  };
}
let sagaUtilsSingleton: SagaUtilsSingleton;

export const useSagaUtilsSingleton = (): SagaUtilsSingleton => {
  if (!sagaUtilsSingleton) {
    sagaUtilsSingleton = new SagaUtilsSingleton();
  }
  return sagaUtilsSingleton;
};