# GraphQL complete server

## Installation

### First step

`git clone ...`

### Configuration

#### Environnement file

`cp .env.default .env`

*Edit .env*

*TODO DESCRIBE .env*

*TODO HOW TO GET SENDGRID API*

*TODO HOW TO SET SLACK*

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
    username
  }
}
```

```
mutation {
  createUser(username:"Jean") {
    id
  }
}
```

## Tutorials & References

https://www.youtube.com/watch?v=DNPVqK_woRQ



