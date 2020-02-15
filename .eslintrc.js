module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    "react-hooks"
  ],
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'implicit-arrow-linebreak': ['error', 'below'],
    'import/prefer-default-export': 0,
    '@typescript-eslint/semi': 2,
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks watch dependencies
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", 'tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      },
      "webpack": {}
    },
    "import/extensions": [
      ".js",
      ".mjs",
      ".jsx",
      ".ts",
      ".tsx"
    ],
    "import/parsers": {
      "@typescript-eslint/parser": [
        ".ts",
        ".tsx"
      ]
    },
    "import/core-modules": [],
    "import/ignore": [
      "node_modules",
      "\\.(coffee|scss|css|less|hbs|svg|json)$"
    ]
  }
};