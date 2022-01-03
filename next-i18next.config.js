const path = require('path');

module.exports = {
    i18n: {
        locales: ['fr-FR', 'en'],
        defaultLocale: 'fr-FR',
        localePath: path.resolve('./public/locales'),
        localStructural: '{{lng}}/{{ns}}',
        saveMissing: true
    },
  };