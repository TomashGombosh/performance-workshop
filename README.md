# K6 perfromance tests example

## Preparation steps

- [k6.io](https://k6.io/docs/get-started/installation/)
- [NodeJs](https://nodejs.org/en/download/)


- To run perfromance test run `npm run test`

Results will be displayed on remote monitoring infrastructure.



## If you want to use local monitoring console, please follow these steps
### Install Local infrastructure

- Install [Docker](https://www.docker.com/products/docker-desktop/)
- Run `cd local_stack`
- Run `docker-compose up`

Note: you shoulв have free ports 3000 and 8086

### Open monitoring tool

- To open Graphana dashboards use **admin/admin** default credentials.
You can use default K6 dashboad to view the results (Dashboard > Browse > Enter K6 in the search field > Open dashboard)

### Start performance test with local monitoring

- To run perfromance test run `npm run test-local_stack`
