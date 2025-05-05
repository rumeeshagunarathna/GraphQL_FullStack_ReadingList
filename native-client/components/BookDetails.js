// import React from "react";
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import { useQuery } from "@apollo/client";
// import { getBookQuery } from "../queries/queries";
// //import styles from "../styles/styles";

// const BookDetails = ({ bookId }) => {
//   const { loading, error, data } = useQuery(getBookQuery, {
//     variables: { id: bookId },
//     skip: !bookId,
//   });

//   if (!bookId) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.infoText}>No book selected.</Text>
//       </View>
//     );
//   }

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.infoText}>Loading...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.infoText}>Error: {error.message}</Text>
//       </View>
//     );
//   }

//   const { book } = data;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{book.name}</Text>
//       <Text>Genre: {book.genre}</Text>
//       <Text>Author: {book.author.name}</Text>
//       <Text style={styles.subtitle}>All books by this author:</Text>
//       <FlatList
//         data={book.author.books}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Text style={styles.listItem}>• {item.name}</Text>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   infoText: {
//     fontSize: 16,
//     color: "gray",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   subtitle: {
//     marginTop: 12,
//     fontWeight: "bold",
//   },
//   listItem: {
//     marginLeft: 8,
//     marginTop: 4,
//   },
// });

// export default BookDetails;



import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookId },
    skip: !bookId,
  });

  if (!bookId) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>No book selected.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Error: {error.message}</Text>
      </View>
    );
  }

  const { book } = data;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.name}</Text>
      <Text style={styles.text}>Genre: {book.genre}</Text>
      <Text style={styles.text}>Author: {book.author.name}</Text>
      <Text style={[styles.subtitle, styles.text]}>
        All books by this author:
      </Text>
      <FlatList
        data={book.author.books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>• {item.name}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#6A1B9A", // purple background
    borderRadius: 8,
    margin: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    marginTop: 12,
    fontWeight: "bold",
  },
  text: {
    color: "#f5f5f5",
    fontSize: 16,
  },
  listItem: {
    marginLeft: 8,
    marginTop: 4,
    color: "#ddd",
  },
});

export default BookDetails;
