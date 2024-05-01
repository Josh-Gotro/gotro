# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Updating Heroku Environment Variables

- update the environment variable in heroku settings > config vars
- restart the dynos using the heroku cli or from the dashboard.

### Restart Dynos

1. `heroku login`
2. `heroku apps`
3. `heroku restart -a app-name`

If restarting the dynos doesn't work you need to force a build on heroku. Builds happen automatically when you push changes in, so consider pushing any change to the repo to trigger it.
