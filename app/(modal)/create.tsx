import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
const Page = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const router = useRouter();
  const createGroup = useMutation(api.groups.createGroup);
  const onCreate = async () => {
    if (name && desc) {
      await createGroup({
        name,
        description: desc,
        icon_URL: icon,
      });
      router.back();
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder="Group Name"
      ></TextInput>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textInput}
        value={desc}
        onChangeText={setDesc}
        placeholder="Group Description"
      ></TextInput>{" "}
      <Text style={styles.label}>Icon URL</Text>
      <TextInput
        style={styles.textInput}
        value={icon}
        onChangeText={setIcon}
        placeholder="Group Icon"
      ></TextInput>
      <TouchableOpacity style={styles.btn} onPress={onCreate}>
        <Text style={styles.btnTxt}>Create</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5EA",
    padding: 10,
  },
  label: {
    marginVertical: 10,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 7,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: "#fff",
  },
  btn: {
    padding: 10,
    marginVertical: 25,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "orange",

    borderColor: "orange",
  },
  btnTxt: {
    textAlign: "center",
    color: "zinc",
  },
});
export default Page;
