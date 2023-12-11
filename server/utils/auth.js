const jwt = require('jsonwebtoken');
require('dotenv').config()
const { GraphQLError } = require('graphql');
// set token secret and expiration date
const secret = 'iamExiled';
const expiration = '12h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // function for our authenticated routes
  authMiddleware: async function ({ req }) {
    
    // allows token to be sent via  req.query or headers
    let token = await req.body.token || await req.query.token || await req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    //verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      console.log('Token', data);
      return req;

    } catch(error) {
      console.error('server/utils/auth.js: Invalid token', error);
    }

  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
