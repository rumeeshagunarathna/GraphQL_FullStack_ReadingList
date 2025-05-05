import React from "react";

import { gql, useQuery } from "@apollo/client";
import { getAuthorsQuery } from "../queries/queries";

// const getAuthorsQuery = gql`
//   {
    
//       authors {
//         id
//         name
//       }
    
//   }
// `;

function AddBook(props) {

      const { loading, error, data } = useQuery(getAuthorsQuery);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      console.log(props); 

      const displayAuthors = () => {
        return data.authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ));
      };

  return (
    <form id="add-book">
      <div className="field">
        <label>Book Name:</label>
        <input type="test" />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="test" />
      </div>

      <div className="field">
        <label>Author:</label>
                    <select>
                          <option>Select Author</option>
                          {displayAuthors()}
        </select>
              </div>
              <button>+</button>
    </form>
  );
}

export default AddBook;