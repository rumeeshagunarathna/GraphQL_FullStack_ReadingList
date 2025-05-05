// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { useQuery, useMutation, gql } from "@apollo/client";
// import { getAuthorsQuery, addBookMutation } from "../queries/queries";
// //import styles from "../styles/styles";

// const getBooksQuery = gql`
//   {
//     books {
//       id
//       name
//     }
//   }
// `;

// export default function AddBook() {
//   const { loading, error, data } = useQuery(getAuthorsQuery);
//   const [addBook] = useMutation(addBookMutation, {
//     refetchQueries: [{ query: getBooksQuery }],
//   });

//   const [name, setName] = useState("");
//   const [genre, setGenre] = useState("");
//   const [authorId, setAuthorId] = useState("");

//   const handleSubmit = () => {
//     if (!name || !genre || !authorId) {
//       Alert.alert("Validation Error", "All fields are required!");
//       return;
//     }

//     addBook({
//       variables: { name, genre, authorId },
//     });

//     setName("");
//     setGenre("");
//     setAuthorId("");
//     Alert.alert("Success", "Book added!");
//   };

//   return (
//     <View style={styles.form}>
//       <Text style={styles.label}>Book Name:</Text>
//       <TextInput
//         style={styles.input}
//         value={name}
//         onChangeText={(text) => setName(text)}
//         placeholder="Enter book name"
//       />

//       <Text style={styles.label}>Genre:</Text>
//       <TextInput
//         style={styles.input}
//         value={genre}
//         onChangeText={(text) => setGenre(text)}
//         placeholder="Enter genre"
//       />

//       <Text style={styles.label}>Author:</Text>
//       {loading ? (
//         <ActivityIndicator />
//       ) : error ? (
//         <Text>Error loading authors</Text>
//       ) : (
//         <Picker
//           selectedValue={authorId}
//           onValueChange={(itemValue) => setAuthorId(itemValue)}
//         >
//           <Picker.Item label="Select Author" value="" />
//           {data.authors.map((author) => (
//             <Picker.Item
//               key={author.id}
//               label={author.name}
//               value={author.id}
//             />
//           ))}
//         </Picker>
//       )}

//       <Button title="Add Book" onPress={handleSubmit} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   form: {
//     backgroundColor: "#fff",
//     padding: 20,
//     //position: "absolute",
//     bottom: 0,
//     left: 0,
//     //width: "100%",
//   },
//   label: {
//     //marginVertical: 8,
//     //fontWeight: "bold",
//     textAlign: "left",
//     padding: 6,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 8,
//     borderRadius: 4,
//     padding: 6,
//     margin: 4,
//   },
//   field: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: 10,
//   },
//   button: {
//     backgroundColor: "#AD1457",
//     color: "#fff",
//     fontSize: 2,
//     paddingHorizontal: 10,
//     borderRadius: 50,
//     position: "absolute",
//     bottom: 10,
//     left: 10,
//   },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
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
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
        <>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setDropdownVisible(true)}
          >
            <Text>
              {authorId
                ? data.authors.find((a) => a.id === authorId)?.name
                : "Select Author"}
            </Text>
          </TouchableOpacity>

          <Modal
            visible={dropdownVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setDropdownVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={data.authors}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => {
                        setAuthorId(item.id);
                        setDropdownVisible(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Modal>
        </>
      )}

      {/* <Button title="Add Book" onPress={handleSubmit} /> */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Book</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#fff",
    padding: 20,
  },
  label: {
    textAlign: "left",
    padding: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    backgroundColor: "white",
    margin: 40,
    padding: 20,
    borderRadius: 8,
    maxHeight: "60%",
  },
  modalItem: {
    padding: 12,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "#6A1B9A",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 16,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
