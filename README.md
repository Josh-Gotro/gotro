# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## updating user facing heroku environment variable.

- update the environment variable in heroku settings > config vars
- rebuild the app locally by running `npm run build`
- push the changes up.
- restart the dynos using the heroku cli or from the dashboard.

### restart dynos
1. `heroku login`
2. `heroku apps`
3. `heroku restart -a app-name`
