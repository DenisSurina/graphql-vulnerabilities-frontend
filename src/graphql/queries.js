import { gql } from '@apollo/client/core';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        role
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        role
      }
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks($search: String) {
    books(search: $search) {
      id
      name
      author
      genre
      price
      description
      imageUrl
    }
  }
`;

export const GET_MY_BOOKS = gql`
  query GetMyBooks {
    myBooks {
      id
      name
      author
      genre
      price
      description
      imageUrl
    }
  }
`;

export const BUY_BOOK = gql`
  mutation BuyBook($bookId: ID!) {
    buyBook(bookId: $bookId) {
      id
      name
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($name: String!, $author: String!, $genre: String!, $price: Float!, $description: String, $imageUrl: String) {
    addBook(name: $name, author: $author, genre: $genre, price: $price, description: $description, imageUrl: $imageUrl) {
      id
      name
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      role
    }
  }
`;
