import { api } from "@/convex/_generated/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useConvex, useMutation, useQuery } from "convex/react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SendHorizonal } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Page = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const { chatid } = useLocalSearchParams();
  const convex = useConvex();
  const [newMessage, setNewMessage] = useState<string>("");
  const [user, setUser] = useState(null);
  const addMessage = useMutation(api.messages.sendMessages);
  const messages = useQuery(api.messages.get, {
    group_id: chatid as Id<"groups">,
  });

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const loadGroup = async () => {
      const groupInfo = await convex.query(api.groups.getGroup, {
        id: chatid as Id<"groups">,
      });
      navigation.setOptions({ headerTitle: groupInfo?.name });
    };
    loadGroup();
  }, [chatid]);

  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (!user) {
        setTimeout(() => {
          setVisible(true);
        }, 100);
      } else {
        setName(user);
      }
    };
    loadUser();
  }, []);

  const renderMessages: ListRenderItem<Doc<"messages">> = ({ item }) => {
    const isUserMessage = item.user === user;
    return (
      <View
        style={[
          styles.messageBubble,
          isUserMessage ? styles.theirMessage : styles.myMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    );
  };

  const handleMessages = async () => {
    if (!newMessage.trim()) return;
    await addMessage({
      content: newMessage,
      group_id: chatid as Id<"groups">,
      user: name,
    });
    setNewMessage("");
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessages}
              keyExtractor={(item) => item._id.toString()}
              keyboardShouldPersistTaps="handled"
            />

            {/* input bar */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={newMessage}
                onChangeText={setNewMessage}
                multiline
                placeholder="Type your message..."
              />
              <TouchableOpacity style={styles.sendbtn} onPress={handleMessages}>
                <SendHorizonal />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5EA",
  },
  sendbtn: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#F8F5EA",
    fontSize: 16,
    color: "#333",
  },
  messageBubble: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 16,
    maxWidth: "80%",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    paddingHorizontal: 12,
    marginHorizontal: 12,
    marginVertical: 4,
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Page;
