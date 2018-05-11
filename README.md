# Complete GraphQL server and create-react-app client

This project contains

- a Node.js graphQL server using Express, Apollo server, Sequelize, PostgreSQL, SendGrid and Slack
- create-react-app client using Ant Design for its UI, Apollo Client and less.

The server is already configured with SubscriptionServer middleware even if there's no subscriptions defined in schema and resolvers.


## Installation

### First step

`git clone ...`

### Configuration

#### Environnement file

`cp .env.default .env`

*Edit .env*

**TODO DESCRIBE .env**

**TODO HOW TO GET SENDGRID API**

**TODO HOW TO SET SLACK**

#### Database

```
CREATE USER myuser;
ALTER USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
CREATE DATABASE mydatabase;
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
```

### Install module and migrate database

`npm install`

## Start

### Development

`npm start`

### Production

`npm run start-prod`

## Test

### Using GraphiQL

`http://localhost:5005/graphiql`

```
{
  allUsers {
    id,
    name,
    email
  }
}
```

```
mutation {
  register(
    name: "Admin",
    email: "admin@my.site",
    password: "admin"
  ) {
    id
  }
}
```

```
mutation {
  login(
    email: "admin@my.site",
    password: "admin"
  ) {
    token,
    refreshToken
  }
}
```

## Tutorials & References

https://www.youtube.com/watch?v=DNPVqK_woRQ



