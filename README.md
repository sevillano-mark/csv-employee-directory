<h1>CSV Employee Directory API</h1>

## Description

CSV Employee Directory : Created using [Nest](https://github.com/nestjs/nest) framework.

Swagger Documentation: http://localhost:3000/api

## API Overview

<h2>- Employee</h2>

<h3>GET - /v1/employee</h3>
<h4><i>Query parameters:</i></h4>

```yaml
{
  @ApiProperty({ default: 1, required: false })
  page = 1;

  @ApiProperty({ default: 10, required: false })
  pageLimit = 10;

  @ApiProperty({ default: '_id', required: false })
  orderBy = '_id';

  @ApiProperty({
    enum: OrderEnum,
    enumName: 'OrderEnum',
    default: OrderEnum.asc,
    required: false,
  })
  order: OrderEnum = OrderEnum.asc;
}
```

<h4><i>Sample output:</i></h4>

```yaml
{
  "statusCode": 200,
  "message": "",
  "data": {
    "results": [
      {
        "employeeNumber": 1,
        "firstName": "Mark",
        "lastName": "Sevillano",
        "email": "mark.sevillano@softvision.com",
        "hireDate": "2022-07-11T13:37:00.300Z",
        "community": {
          "_id": "62fce28826b0d657ef6dcab9",
          "communityId": 1,
          "name": "Community 1",
          "description": "Description for Community 1"
        },
        "createdAt": "2022-08-17T13:37:49.456Z",
        "updatedAt": "2022-08-17T13:37:49.456Z"
      },
      {
        "employeeNumber": 2,
        "firstName": "James",
        "lastName": "Sevillano",
        "email": "james.sevillano@softvision.com",
        "hireDate": "2022-07-18T13:37:00.300Z",
        "community": {
          "_id": "62fce2ef26b0d657ef6dcabb",
          "communityId": 2,
          "name": "Community 2",
          "description": "Description for Community 2"
        },
        "createdAt": "2022-08-17T13:39:00.340Z",
        "updatedAt": "2022-08-17T13:39:00.340Z"
      }
    ],
    "currentPage": 1,
    "pageSize": 10
  }
}
```

<h2>- Community</h2>

<h3>GET - /v1/community</h3>
<h4><i>Query parameters:</i></h4>

```yaml
{
  @ApiProperty({ default: 1, required: false })
  page = 1;

  @ApiProperty({ default: 10, required: false })
  pageLimit = 10;

  @ApiProperty({ default: '_id', required: false })
  orderBy = '_id';

  @ApiProperty({
    enum: OrderEnum,
    enumName: 'OrderEnum',
    default: OrderEnum.asc,
    required: false,
  })
  order: OrderEnum = OrderEnum.asc;
}
```

<h4><i>Sample output:</i></h4>

```yaml
{
  "statusCode": 200,
  "message": "",
  "data": {
    "results": [
      {
        "communityId": 1,
        "name": "Community 1",
        "description": "Description for Community 1",
        "createdAt": "2022-08-17T12:43:52.245Z",
        "updatedAt": "2022-08-17T12:43:52.245Z"
      },
      {
        "communityId": 2,
        "name": "Community 2",
        "description": "Description for Community 2",
        "createdAt": "2022-08-17T12:45:35.735Z",
        "updatedAt": "2022-08-17T12:45:35.735Z"
      },
      {
        "communityId": 3,
        "name": "Community 3",
        "description": "Description for Community 3",
        "createdAt": "2022-08-17T12:45:53.236Z",
        "updatedAt": "2022-08-17T12:45:53.236Z"
      }
    ],
    "currentPage": 1,
    "pageSize": 10
  }
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
