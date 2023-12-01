const typeDefs = `

    type Project {
        projectName: String
        projectDescription: String
        projectImage: ?
        
    }
    type Auth {
            token: ID!
            user: User
        }

    type Query {
        }

    type Mutation {
    
        }
    
`;

module.exports =  typeDefs ;