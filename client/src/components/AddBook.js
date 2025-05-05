// import React from "react";

// import { gql, useQuery } from "@apollo/client";
// import { getAuthorsQuery } from "../queries/queries";



// function AddBook(props) {

//       const { loading, error, data } = useQuery(getAuthorsQuery);

//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error: {error.message}</p>;
//       console.log(props); 

//       constructor(props){
//             super(props);
//             this.state = {
//                   name: '',
//                   genre: '',
//                   authorId: ''
//             };
//       }

//       const displayAuthors = () => {
//         return data.authors.map((author) => (
//           <option key={author.id} value={author.id}>
//             {author.name}
//           </option>
//         ));
//       };

//   return (
//     <form id="add-book">
//       <div className="field">
//         <label>Book Name:</label>
//         <input type="text" onChange={(e) => this.setState({name:e.target.value})}/>
//       </div>

//       <div className="field">
//         <label>Genre:</label>
//         <input type="text" />
//       </div>

//       <div className="field">
//         <label>Author:</label>
//                     <select>
//                           <option>Select Author</option>
//                           {displayAuthors()}
//         </select>
//               </div>
//               <button>+</button>
//     </form>
//   );
// }

// export default AddBook;

import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { getAuthorsQuery } from "../queries/queries";
import { addBookMutation } from "../queries/queries";


// Optional: Used to refresh the list of books after adding
const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`;

function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation, {
    refetchQueries: [{ query: getBooksQuery }],
  });

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const displayAuthors = () => {
    if (loading) return <option disabled>Loading authors...</option>;
    if (error) return <option disabled>Error loading authors</option>;

    return data.authors.map((author) => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !genre || !authorId) {
      alert("All fields are required!");
      return;
    }

    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
    });

    // Reset form
    setName("");
    setGenre("");
    setAuthorId("");
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
          <option value="">Select Author</option>
          {displayAuthors()}
        </select>
      </div>

      <button type="submit">+</button>
    </form>
  );
}

export default AddBook;
