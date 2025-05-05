import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Components (you'll need to convert these too!)
import BookList from "../components/BookList";
import AddBook from "../components/AddBook";

// Apollo Client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Use IP address for real devices
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>My Reading List</Text>
        <BookList />
        <AddBook />
      </ScrollView>
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
  },
});
