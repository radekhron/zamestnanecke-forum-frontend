/* eslint no-console:0 */
/* eslint consistent-return:0 */

const jwtDecode = require('jwt-decode');

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzUi1OQUYtVUJHIiwiaXNzIjoiemFtZXN0bmFuZWNrZS1mb3J1bSIsInBlcm1pc3Npb25zIjoiZW1wbG95ZWUiLCJpYXQiOjE0OTk3NzI4ODZ9.WAf_U7GgXU63ptqxEvcfM33XIhH28JaJb5HGJQ9MV70';


console.log(jwtDecode(jwt));
