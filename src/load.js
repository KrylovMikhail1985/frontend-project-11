const domParser = new DOMParser();

export default async (url, maxI, numberNewFid) => {
  const rrr = fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error('Network response with url: was not ok.');
    })
    .then((data) => {
      const result = {
        fids: {},
        topics: {},
      };
      let i = maxI;
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
      items.forEach((item) => {
        i += 1;
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const description = item.querySelector('description').textContent;
        result.topics[i] = {
          title,
          link,
          description,
        };
      });
      return result;
    });
  return rrr;
};
