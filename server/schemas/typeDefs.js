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
        userId: ID!
    }

    type Comment {
        _id: ID
        commentAuthor: ID
        commentText: String!
        commentDate: String
        upvotes: Int
        projectId: ID
    }

    type Donation {
        _id: ID
        donorId: ID
        amount: Float!
        donationDate: String
        projectId: ID
    }

    type Auth {
            token: ID!
            user: User
        }

    type CommentedProject {
        projectName: String
        comment: Comment
    }

    type ProjectDonatedTo {
        donation: Donation
        projectName: String
    }

    type Query {
        users: [User]
        user(_id: ID!): User
        allProjects: [Project]
        singleProject(_id: ID!): Project
        me(_id: ID!): User
        commentsPerProject(projectId: ID!): [Comment]
        allMyComments(_id: ID!): [CommentedProject]
        allMyDonations(_id: ID!): [ProjectDonatedTo]
        }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        addProject(projectName: String!, projectDescription: String!, expiresIn: Int!, goalAmount: Float!, userId: ID): User
        addComment(commentText: String!, projectId: ID!, commentAuthor: ID!): Project
        upvoteComment(commentId: ID!,upvote: Boolean): Comment
        addReply(replyText: String!): Comment
        makeDonation(projectId: ID!, amount: Float!, donorId: ID! ) : User

        updateUser(username: String, email: String, password: String): User
          }
        `;
    

module.exports =  typeDefs ;