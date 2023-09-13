export default (state, i18n) => {
  // input and primary button
  const form = document.querySelector('.rss-form');
  const input = form.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  if (state.errors != null) {
    feedback.textContent = i18n.t(`errors.${state.errors}`);
    if (!input.classList.contains('is-invalid')) {
      input.classList.add('is-invalid');
    }
    if (!feedback.classList.contains('text-danger')) {
      feedback.classList.add('text-danger');
    }
    if (feedback.classList.contains('text-success')) {
      feedback.classList.remove('text-successs');
    }
  } else {
    feedback.textContent = i18n.t(`messages.${state.message}`);
    if (input.classList.contains('is-invalid')) {
      input.classList.remove('is-invalid');
    }
    if (!feedback.classList.contains('text-success')) {
      feedback.classList.add('text-success');
    }
    if (feedback.classList.contains('text-danger')) {
      feedback.classList.remove('text-danger');
    }
    input.value = '';
    input.focus();
  }
  // RSS news
  if (Object.keys(state.topics).length > 0) {
    // add posts
    const container = document.querySelector('.posts');
    container.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card', 'border-0');
    const div1 = document.createElement('div');
    div1.classList.add('card-body');
    div1.innerHTML = '<h2 class="card-title h4">Посты</h2>';
    div.append(div1);
    container.append(div);
    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    const topics = Object.entries(state.topics);
    topics.forEach(([key, topic]) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'alian-items-start', 'border-0', 'border-end-0');

      const a = document.createElement('a');
      a.href = topic.link;
      a.textContent = topic.title;
      li.append(a);
      const button = document.createElement('button');
      button.type = 'button';
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.textContent = 'Просмотр';
      button.setAttribute('data-id', key);
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');
      li.append(button);

      ul.prepend(li);
    });
    container.append(ul);

    // add feeds
    const feedsContainer = document.querySelector('.feeds');
    feedsContainer.innerHTML = '';
    const divFeed = document.createElement('div');
    divFeed.classList.add('card', 'border-0');
    const divFeed1 = document.createElement('div');
    divFeed1.classList.add('card-body');
    divFeed1.innerHTML = '<h2 class="card-title h4">Фиды</h2>';
    divFeed.append(divFeed1);
    feedsContainer.append(divFeed);
    const ulFeed = document.createElement('ul');
    ulFeed.classList.add('list-group', 'border-0', 'rounded-0');
    const feeds = Object.entries(state.fids);
    feeds.forEach(([key, feed]) => {
      const liFeed = document.createElement('li');
      liFeed.classList.add('list-group-item', 'border-0', 'border-end-0', `data-id-${key}`);

      const h3 = document.createElement('h3');
      h3.classList.add('h6', 'm-0');
      h3.textContent = feed.title;
      liFeed.append(h3);
      const p = document.createElement('p');
      p.classList.add('m-0', 'small', 'text-black-50');
      p.textContent = feed.description;
      liFeed.append(p);

      ulFeed.prepend(liFeed);
    });
    feedsContainer.append(ulFeed);
  }
};
