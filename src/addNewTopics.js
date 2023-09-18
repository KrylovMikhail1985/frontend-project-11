export default (currentState, listOfNewTopics) => {
  const state = { ...currentState };
  let i = Object.values(state.topics).length + 1;
  listOfNewTopics.forEach((topic) => {
    state.topics[i] = topic;
    i += 1;
  });
  return state;
};
