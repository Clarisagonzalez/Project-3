const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        donations: [Donation]!
        comments: [Comment]!
        projects: [Project]!
    }

    type Project {
        _id: ID
        projectName: String
        projectDescription: String
        projectDate: String
        expiresIn: Int
        goalAmount: Float
        comments: [Comment]!
        donations: [Donation]!
    }

    type Comment {
        _id: ID
        commentAuthor: String
        commentText: String
        commentDate: String
        upvotes: Int
        projectId: ID
    }

    type Donation {
        _id: ID
        donorId: ID
        amount: Float
        donationDate: String
    }

    type Auth {
            token: ID!
            user: User
        }

    type Query {
        users: [User]
        user(_id: ID!): User
        projects: [Project]
        project(_id: ID!): Project
        me: Auth
        }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addProject(projectName: String!, projectDescription: String!, expiresIn: Int!, goalAmount: Float!, userId: ID!): User
        addComment(commentText: String!): Comment
        upvoteComment(commentId: ID!,upvote: Boolean): Comment
        addReply(replyText: String!): Comment
        makeDonation(projectId: ID!, amount: Float!) : Donation
        updateUser(username: String, email: String, password: String): User
          }
        `;
    

module.exports =  typeDefs ;