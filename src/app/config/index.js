// @flow weak

export const appConfig = {
  api: (process.env.ENV === 'production' ? {
    serverUrl: "https://myserver.com"
  } : {
    serverUrl: "http://localhost:8888"
  }),
  apiVersion: '/api/v1'
};
