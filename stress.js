import http from 'k6/http';
import { check } from "k6";
import { Trend } from "k6/metrics";
const TARGET_API = "https://api-dev.buy-it.afj-solution.com/api/v1"
const trends = new Trend("trends");
/*
 Target 2000, for 600 seconds
 Warm up -> users from 10 to 20 by 40s
 Stress test -> users from 20 to 200 by 120s N*1.5
 Cold up -> users from 200 to 10 by 120s
*/
export const options = {
  rate: 20,
  startVUs: 100,
  stages: [
    { duration: '40s', target: 1000 },
    { duration: '2m', target: 3000 },
    { duration: '1m', target: 1000 },
  ],
};

export function setup() {
  console.log("Setup the test. Login to the application");
  const loginParams = {
    headers: {
      "Content-type": "application/json"
    }
  }
  const loginRequest = {
    username: "performance-test",
    password: "Test123$"
  };
  const tokenResponse = http.post(`${TARGET_API}/login`, JSON.stringify(loginRequest), loginParams);
  const token = JSON.parse(tokenResponse.body).token;
  return token;
}

export default function (token) {
  const params = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const categoriesResponse = http.get(`${TARGET_API}/localize`, params);
  check(categoriesResponse, { "status was 200": (r) => r.status === 200 });
  trends.add(categoriesResponse.timings.sending + categoriesResponse.timings.receiving);
}
