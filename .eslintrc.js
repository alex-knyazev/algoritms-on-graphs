module.exports = {
  parser: "babel-eslint",
  extends: "airbnb",
  rules: {
    "react/no-did-mount-set-state": "off",
    "import/no-extraneous-dependencies": "off",
    "no-use-before-define": "off",
    "arrow-body-style": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    // из-за ошибки в create-react-app
    "jsx-a11y/label-has-for": "off",
    // из-за ошибки в create-react-app
    "jsx-a11y/anchor-is-valid": "off",
    // что не получилось указать aliases
    "import/no-unresolved": "off",
    // что не получилось указать aliases
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "no-underscore-dangle": "off",
    // uncommit on developing
    "no-console": "off",
    "no-debugger": "off"
  },
  globals: {
    /* Объекты окружения в браузере */
    window: true,
    browser: true,
    document: true,
    fetch: true,
    serviceworker: true,
    describe: true,

    /* Jest */
    expect: true,
    beforeEach: true,
    it: true,
    test: true,
    beforeAll: true,
    afterAll: true
  }
};
