import { gql } from '@apollo/client';

export const QUERY_SINGLE_PROJECT = gql`
  query singleProject($projectId: ID!) {
    project(projectId: $projectId) {
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
          _id
            projectName
            projectDescription
            projectDate
            expiresIn
            goalAmount
            userId
        }
    }
}
`;
export const MY_PROJECTS = gql`
query myProjects {
    myProjects {
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

export const COMMENTS_PER_PROJECT = gql`
query commentsPerProject($projectId: ID!) {
    commentsPerProject(projectId: $projectId) {
      _id
      commentText
      commentDate
      commentAuthor
    }
}`
