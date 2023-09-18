// doing link-secondary from ordinary link
export default (state) => {
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const buttons = document.querySelectorAll('.btn-outline-primary');
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const topic = state.topics[e.target.dataset.id];
      modalTitle.textContent = topic.title;
      modalBody.textContent = topic.description;
      const a = e.target.previousElementSibling;
      a.classList.remove('fw-bold');
      a.classList.add('fw-normal', 'link-secondary');
    });
  });
};
