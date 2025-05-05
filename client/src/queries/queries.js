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

export { getAuthorsQuery, getBooksQuery };