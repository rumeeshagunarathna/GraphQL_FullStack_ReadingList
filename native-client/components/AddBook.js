import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useQuery, useMutation, gql } from "@apollo/client";
import { getAuthorsQuery, addBookMutation } from "../queries/queries";

const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`;

export default function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation, {
    refetchQueries: [{ query: getBooksQuery }],
  });

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const handleSubmit = () => {
    if (!name || !genre || !authorId) {
      Alert.alert("Validation Error", "All fields are required!");
      return;
    }

    addBook({
      variables: { name, genre, authorId },
    });

    setName("");
    setGenre("");
    setAuthorId("");
    Alert.alert("Success", "Book added!");
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Book Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter book name"
      />

      <Text style={styles.label}>Genre:</Text>
      <TextInput
        style={styles.input}
        value={genre}
        onChangeText={(text) => setGenre(text)}
        placeholder="Enter genre"
      />

      <Text style={styles.label}>Author:</Text>
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>Error loading authors</Text>
      ) : (
        <Picker
          selectedValue={authorId}
          onValueChange={(itemValue) => setAuthorId(itemValue)}
        >
          <Picker.Item label="Select Author" value="" />
          {data.authors.map((author) => (
            <Picker.Item
              key={author.id}
              label={author.name}
              value={author.id}
            />
          ))}
        </Picker>
      )}

      <Button title="Add Book" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 16,
  },
  label: {
    marginVertical: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
});
