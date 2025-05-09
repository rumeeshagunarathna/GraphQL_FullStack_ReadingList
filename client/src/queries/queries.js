import React from "react";

import { gql, useQuery } from "@apollo/client";

const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

// Mutation to add a book
const addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;

const getBookQuery = gql`
  query($id: ID){
    book(id: $id){
       id
       name
       genre
       author{
        id
        name
        age
        books{
          name
          id
        }
       }
    }
  }
`

export { getAuthorsQuery, getBooksQuery,addBookMutation,getBookQuery };