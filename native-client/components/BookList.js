import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";
//import styles from "../styles/styles";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selectedBookId, setSelectedBookId] = useState(null);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Loading books...</Text>
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

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedBookId(item.id)}>
      <Text style={styles.bookItem}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data.books}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <BookDetails bookId={selectedBookId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 10,
    flexGrow: 1,
  },
  infoText: {
    fontSize: 16,
    color: "gray",
  },
  bookItem: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
    margin: 12,
    padding: 10,
    borderRadius: 4,
    borderColor: "#6A1B9A",
    borderWidth: 1,
    boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
    color: "#6A1B9A",
    cursor: "pointer",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#444",
  },
  bookList: {
    padding: 0,
  },
  list: {
    marginBottom: 16,
  },
});

export default BookList;
