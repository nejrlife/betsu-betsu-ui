# betsu-betsu-ui Front End

betsu-betsu-ui FE is a simple web application developed using React.js.

This application is deployed in Vercel and can be accessed thru the following link:

https://betsu-betsu-ui.vercel.app/login

Upon opening the link, the user will enter the log-in page, they can enter these credentials: "test_tom_jha/password". Upon logging in, the user can view the Dashboard, About and Team pages. These pages have different web components such as a button, text fields, checkboxes, a table and icons. A user can then log-out and go back to the log-in page.

Under the hood, this frontend web application connects to an Express.js backend service called betsu-betsu-service. The code for the backend service is pushed in the following repo:
- https://github.com/nejrlife/betsu-betsu-service

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
