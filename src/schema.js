export default `
  type User {
    id: Int!
    name: String!
    email: String!
    isAdmin: Boolean
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    refreshToken: String!
  }

  type Query {
    allUsers: [User!]!
    getUser(id: Int!): User
    getUserByEmail(email: String!): User
    me: User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    updateUser(
      id: Int!, name: String, email: String, isAdmin: Boolean,
    ): [Int!]!
    deleteUser(id: Int!): Int!

    updateAccount(
      name: String, email: String,
    ): [Int!]!

    register(
      name: String!, email: String!, password: String!,
    ): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    refreshTokens(token: String!, refreshToken: String!): AuthPayload!
    setPassword(activation: String!, password: String!): AuthPayload!
    retrievePassword(email: String!): [Int!]!
  }
`;
