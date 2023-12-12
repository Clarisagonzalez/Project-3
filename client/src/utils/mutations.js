import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            password
        }
    }
}`;

export const LOGIN = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password) {
        token
        user  {
            _id
            username
            email
            password
        }
    }
}`;

export const ADD_PROJECT = gql`
mutation addProject($projectName: String!, $projectDescription: String!, $expiresIn: Int!, $goalAmount: Float!, $userId: ID){
    addProject(projectName: $projectName, projectDescription: $projectDescription, expiresIn: $expiresIn, goalAmount: $goalAmount, userId: $userId) {
       _id
        username
       email
       projects{
        _id
        projectName
        projectDescription
        expiresIn
        goalAmount
       }
    }
}`;

export const ADD_COMMENT = gql`
mutation addComment($commentText: String!, $projectId: ID!, $commentAuthor: ID!){
    addComment(commentText: $commentText, projectId: $projectId, commentAuthor: $commentAuthor){
        _id
        projectName
        projectDescription
        comments {
        commentText
        commentAuthor
        }
    }
}`;

export const UPDATE_USER = gql`
mutation updateUser($username: String, $email: String, $password: String){
    updateUser(username: $username, email: $email, password: $password) {
        username
        email
        _id
        password
    }
}`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      likeCount
    }
  }
`;

export const DISLIKE_POST = gql`
  mutation dislikePost($postId: ID!) {
    dislikePost(postId: $postId) {
      _id
      dislikeCount
    }
  }
`;

export const MAKE_DONATION = gql `
mutation makeDonation($projectId: ID!, $amount: Float!, $donorId: ID!){
  makeDonation(projectId: $projectId, amount: $amount, donorId: $donorId){
    _id
    username
    email
    donations {
      _id
      donorId
      projectId
      amount
      donationDate
    }
  }
}
`;
