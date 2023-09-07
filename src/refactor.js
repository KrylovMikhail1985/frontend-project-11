export default (state, i18n) => {
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
};
