// import React from "react";
// //import React,{Component} from "react";
// import { gql, useQuery } from "@apollo/client";
// import { getBooksQuery } from "../queries/queries";
// import BookDetails from "./BookDetails";



// function BookList(props) {

//       const { loading, error,data } = useQuery(getBooksQuery);

//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error: {error.message}</p>;
//       console.log(props); 

      
//       constructor(props){
//             super(props);
//             this.state = {
//                   selected:null
//             }
// }

//       const displayBooks = () => {
//         return data.books.map((book) => <li key={book.id} onClick={(e) =>{this.setState({selected:book.id})}}>{book.name}</li>);
//       };
//   return (
//     <div>
//               <ul id="book-list">
//                     {displayBooks()}
//               </ul>
//               <BookDetails bookId={this.state.selected } />
//     </div>
//   );
// }

// export default BookList;

import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selectedBookId, setSelectedBookId] = useState(null);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const displayBooks = () => {
    return data.books.map((book) => (
      <li key={book.id} onClick={() => setSelectedBookId(book.id)}>
        {book.name}
      </li>
    ));
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selectedBookId} />
    </div>
  );
}

export default BookList; 