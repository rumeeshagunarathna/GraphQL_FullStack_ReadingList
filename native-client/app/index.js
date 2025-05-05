import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
//import styles from "../styles/styles";

// Components (you'll need to convert these too!)
import BookList from "../components/BookList";
import AddBook from "../components/AddBook";

// Apollo Client setup
const client = new ApolloClient({
  uri: "http://192.168.8.138:4000/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text style={styles.title}>My Reading List</Text>
        <BookList />
        <AddBook />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#6A1B9A",
  },
});
