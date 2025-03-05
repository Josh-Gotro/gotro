const endpoint = import.meta.env.VITE_APP_BERT_API_ENDPOINT;
const appRoot = import.meta.env.VITE_PUBLIC_URL;
const logoutUrl = import.meta.env.VITE_APP_LINK_SUBSCRIBER_LOGOUT;
const baseUrl = `${endpoint}${appRoot}/rest`;

const config = { baseUrl, logoutUrl };
export default config;
