import load from './load.js';

export default async (currenrState, newUrl) => {
  const state = { ...currenrState };
  // update all RSS from all links
  const tempState = { ...state };
  const pr = load(
    newUrl,
    Object.keys(tempState.topics).length,
    Object.keys(tempState.fids).length + 1,
  );
  return pr.then((data) => {
    if (Object.keys(data.topics).length > 0) {
      state.fids = { ...state.fids, ...data.fids };
      state.topics = { ...state.topics, ...data.topics };
    } else {
      state.errors = 'no_RSS';
    }
    return state;
  });
};
