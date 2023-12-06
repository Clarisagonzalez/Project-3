import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
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
            username
            email
            password
        }
    }
}`;

export const ADD_PROJECT = gql`
mutation addProject($projectName: String!, $projectDescription: String!, $expiresIn: Int, $goalAmount: Float!){
    addProject(projectName: $projectName, projectDescription: $projectDescription, expiresIn: $expiresIn, goalAmount: $goalAmount ) {
        projectName
        projectDescription
        expiresIn
        goalAmount
    }
}`;

export const ADD_COMMENT = gql`
mutation addComment($commentText: String!){
    addComment(commentText: $commentText){
        _id
        commentText
        commentAuthor
    }
}`;

export const UPDATE_USER = gql`
mutation updateUser($username: String, $email: String, $password: String){
    updateUser(username: $username, email: $email, password: $password) {
        username
        email
        _id
    }
}`
