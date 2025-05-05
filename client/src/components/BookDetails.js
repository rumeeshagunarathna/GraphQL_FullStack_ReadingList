// import React from "react";
// import { gql, useQuery } from "@apollo/client";
// import { getBookQuery } from "../queries/queries";

// function BookDetails(props) {

//       const { loading, error,data } = useQuery(getBookQuery);

//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error: {error.message}</p>;
//       console.log(props); 

//       displayBookDetails({
//             const { book } = this.props.data ;
//             if(book) {
//                   return (
//                         <div>
//                               <h2>{book.name}</h2>
//                               <p>{book.genere}</p>
//                               <p>{book.author.name}</p>
//                               <p>All books by this author</p>
//                               <ul className="other-books">
//                                     {book.author.books.map(item => {
//                                           return <li key={item.id}>{item.name }</li>
//                                     })}
//                               </ul>
//                         </div>
//                   )
//             }
//       })
      
//   return (
//     <div id="book-details">
//             <p>Book Details</p> 
//     </div>
//   );
// }

// export default BookDetails;


import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookId },
    skip: !bookId, // Skip the query if no bookId is selected
  });

  if (!bookId)
    return (
      <div id="book-details">
        <p>No book selected.</p>
      </div>
    );
  if (loading)
    return (
      <div id="book-details">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div id="book-details">
        <p>Error: {error.message}</p>
      </div>
    );

  const { book } = data;

  return (
    <div id="book-details">
      <h2>{book.name}</h2>
      <p>Genre: {book.genre}</p>
      <p>Author: {book.author.name}</p>
      <p>All books by this author:</p>
      <ul className="other-books">
        {book.author.books.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookDetails;
