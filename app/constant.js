'use strict';

module.exports = {
  ENABLE: 1,

  REPOS_URL_REGEX: /https?:\/\/github\.com\/([0-9a-zA-Z\-\.]*)\/([0-9a-zA-Z\-\.]*)/i,
  README_URL_REGEX: /https?:\/\/github\.com\/[0-9a-zA-Z\-\.]*\/[0-9a-zA-Z\-\.]*/i,
  DEVELOPER_URL_REGEX: /^https?:\/\/github\.com\/([0-9a-zA-Z\-\.]*)$/i,
};
