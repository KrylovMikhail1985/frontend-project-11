const domParser = new DOMParser();

export default async (url, maxI, numberNewFid) => {
  const rrr = fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error('Network response with url: was not ok.');
    })
    .then((data) => {
      const result = {
        fids: {},
        topics: {},
      };
      // let i = maxI;
      const dom = domParser.parseFromString(data.contents, 'application/xhtml+xml');
      const fidTitle = dom.querySelector('channel > title');
      const fidDescription = dom.querySelector('channel > description');
      if (fidTitle != null && fidDescription != null) {
        result.fids[numberNewFid] = {
          title: fidTitle.textContent,
          description: fidDescription.textContent,
        };
      }
      const items = dom.querySelectorAll('item');
      let i = maxI + items.length;
      items.forEach((item) => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const description = item.querySelector('description').textContent;
        result.topics[i] = {
          title,
          link,
          description,
        };
        i -= 1;
      });
      return result;
    });
  return rrr;
};
