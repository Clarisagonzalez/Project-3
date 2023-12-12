import { gql } from '@apollo/client';

export const QUERY_SINGLE_PROJECT = gql`
  query singleProject($_id: ID!) {
    project(_id: $_id) {
      _id
      projectName
      projectDescription
      projectDate
      expiresIn
      goalAmount
      userId
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
export const ME = gql`
query me($_id: ID!) {
    me(_id: $_id) {
      _id
      username
      email
      projects{
      _id
      projectName
      projectDescription
      expiresIn
      goalAmount
      userId
      }
      donations{
        amount
        projectId
        donorId
        donationDate
      }
  }
}
`;

export const ALL_MY_COMMENTS = gql`
query allMyComments($_id: ID!){
  allMyComments(_id: $_id){
    comment{
      commentText
    }
    projectName
  }
}`;

export const COMMENTS_PER_PROJECT = gql`
query commentsPerProject($projectId: ID!) {
    commentsPerProject(projectId: $projectId) {
      _id
      commentText
      commentDate
      commentAuthor
    }
}`;
