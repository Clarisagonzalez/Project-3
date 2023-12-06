import { gql } from '@apollo/client';

export const QUERY_SINGLE_PROJECT = gql`
  query singleProject($_id: ID) {
    project(_id: $_id) {
      _id
      projectName
      projectDescription
      projectDate
      expiresIn
      goalAmount
      comments {
        commentText
      }
      donations {
        amount
      }
    }
  }
`;

export const QUERY_ALL_PROJECTS = gql`
  query allProjects{
    projects {
      _id
      projectName
      projectDescription
      projectDate
      expiresIn
      goalAmount
      comments {
        commentText,
        commentAuthor
        upvotes
        reply
      }
      donations {
        amount
      }
    }
  }
`;

export const QUERY_USER = gql`
query singleUser($_id: ID){
        user(_id: $_id) {
        username
        email
        donations{
            donorId
            amount
            donationDate
        }
        comments {
            commentAuthor
            commentText
            commentDate
            upvotes
            projectId
        }
        projects {
            projectname
            projectdescription
            projectDate
            expiresIn
            goalAmount
            comments{
                commentText
            }
            donations {
                amount
            }
        }
      }
    }
  }
`;

export const QUERY_USERS = gql`
query allUsers {
    users {
        _id
        username
        email
        donations{
            amount
        }
        comments {
            commentText
        }
        projects {
            projectName
            projectDescription
        }
    }
}
`
export const ME =gql`
query me{
    _id: ID
    username: String
    email: String
    donations: [Donation]!
    comments: [Comment]!
    projects: [Project]!
}
`;

export const DONATION = gql`
`;