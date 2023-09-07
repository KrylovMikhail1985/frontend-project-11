import i18next from 'i18next';

const i18nextInst = i18next.createInstance();
i18nextInst.init({
  lng: 'ru',
  debug: false,
  resources: {
    ru: {
      translation: {
        errors: {
          not_valid: 'Ссылка должна быть валидным URL',
          already_exist: 'RSS уже существует',
        },
        messages: {
          succes: 'RSS успешно загружен',
        },
      },
    },
  },
});

export default i18nextInst;
