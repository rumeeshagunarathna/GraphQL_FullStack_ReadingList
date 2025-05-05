import React from "react";
//import React,{Component} from "react";
import { gql, useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";

// const getBooksQuery = gql`
//   {
    
//       books {
//         id
//         name
//       }
    
//   }
// `;

function BookList(props) {

      const { loading, error,data } = useQuery(getBooksQuery);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      console.log(props); 

      // const displyBooks = () =>{
      //       var data = this.props.data;
      //       if (data.loading) {
      //             return (<div>Loading books...</div>);
      //       } else {
      //             return data.books.map(book => {
      //                   return (
      //                         <li>{ book.name}</li>
      //                   )
      //             })
      //       }
      // }
      const displayBooks = () => {
        return data.books.map((book) => <li key={book.id}>{book.name}</li>);
      };
  return (
    <div>
              <ul id="book-list">
                    {displayBooks()}
              </ul>
    </div>
  );
}

export default BookList;