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

`npm run dev`

### Production

```
npm run build
npm run prod
```

### Deploy Heroku

```
heroku create
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set NODE_ENV=production
heroku config:set SECRET=thisismysecret
git push heroku <currentbranch>:master
```

Cf. Environnment file description above

Heroku deploy uses postinstall npm script to build the application and start npm script to start the server.

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
    token,
    refreshToken
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

## Contribution

All contribution are very welcome especially for improving repository documentation and tests. For example, we could add a deploy in Heroku button.
Please use issues for bug report and feature requests.

## Tutorials & References

https://www.youtube.com/user/99baddawg
https://www.youtube.com/watch?v=DNPVqK_woRQ



