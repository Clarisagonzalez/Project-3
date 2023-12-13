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

    type Site {
        _id: ID
        donorId: ID
        donorName: String
        donationAmount: Float
        donorComment: String
        paymentMethod: String
        donationDate: String
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
        commentsPerProject(projectId: ID!): [Comment]
        allMyComments(_id: ID!): [CommentedProject]
        allMyDonations(_id: ID!): [ProjectDonatedTo]
        allSiteDonations: [Site]!
        }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        addProject(projectName: String!, projectDescription: String!, expiresIn: Int!, goalAmount: Float!, userId: ID): User
        addComment(commentText: String!, projectId: ID!, commentAuthor: ID!): Project
        upvoteComment(commentId: ID!,upvote: Boolean): Comment
        makeDonation(projectId: ID!, amount: Float!, donorId: ID! ): User
        makeSiteDonation(donorId: ID!, donorName: String!, donationAmount: Float!, paymentMethod: String!): Site

        updateUser(username: String, email: String, password: String): User

        deleteComment(_id: ID!): User
        deleteProject(userId: ID!, projectId: ID!): User
          }
        `;
    

module.exports =  typeDefs ;