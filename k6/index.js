import http from 'k6/http';
import { check } from "k6";
import { Trend } from "k6/metrics";
const TARGET_API = "https://api-dev.buy-it.afj-solution.com/api/v1"
const trends = new Trend("trends");
export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 20 },
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
  const categoriesResponse = http.get(`${TARGET_API}/products`, params);
  check(categoriesResponse, { "status was 200": (r) => r.status === 200 });
  trends.add(categoriesResponse.timings.sending + categoriesResponse.timings.receiving);
}
