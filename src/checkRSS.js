// import _ form 'lodash';
import load from './load.js';

export default async (currentState) => {
  const state = { ...currentState };
  const topics = Object.values(state.topics);
  const i = topics.length;
  if (i > 0) {
    const titles = {};
    topics.forEach((topic) => {
      titles[topic.title] = 'empty';
    });
    const titlesArr = Object.keys(titles);
    const urls = Object.values(state.urls);
    const arrayOfPromises = [];
    urls.forEach((url) => arrayOfPromises.push(load(url, 1, 1)));
    const pr = Promise.all((arrayOfPromises));
    return pr.then((listOfData) => {
      const listOfTopics = [];
      listOfData.forEach((data) => {
        Object.values(data.topics).forEach((topic) => {
          if (!titlesArr.includes(topic.title)) {
            listOfTopics.push(topic);
          }
        });
      });
      return listOfTopics;
    }).catch(() => 'net_error');
  }
  return undefined;
};
// http://lorem-rss.herokuapp.com/feed?unit=second&interval=30
