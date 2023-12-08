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
`;

export const QUERY_ALL_USERS = gql`
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
export const MY_PROJECTS = gql`
query myProjects {
    projects {
      _id
      projectName
      projectDescription
      expiresIn
      goalAmount
      projectImage
      userId
  }
}
`;
/*
export const DONATION = gql`
`;*/