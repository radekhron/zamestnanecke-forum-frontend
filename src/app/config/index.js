// @flow weak

export const appConfig = {
  api: (process.env.ENV === 'production' ? {
    serverUrl: "https://myserver.com"
  } : {
    serverUrl: "http://localhost:8888"
  }),
  apiVersion: '/api/v1'
};

export const commonPasswords = [
'123456',
'heslo',
'12345',
'123456789',
'martin',
'aaaaaa',
'michal',
'internet',
'aaaaaa',
'666666',
'159753',
'hesloheslo',
'111111',
'heslo123',
'genius',
'matrix',
'hovno',
'12345678',
'000000',
'ahojky',
'password',
'slunicko',
'tomas',
'tunning',
'000000',
'nevim',
'killer',
'lopata',
'pavel',
'monika',
'lukasek',
'qwerty',
'poklop',
'11111',
'asdfgh',
'asdasd',
'nasrat',
'qwert',
'jahoda',
'lucinka',
'sparta'
]
