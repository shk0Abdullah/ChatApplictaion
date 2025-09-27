import { api } from "@/convex/_generated/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useConvex } from "convex/react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
const Page = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const { chatid } = useLocalSearchParams();
  const convex = useConvex();
  const [user, setUser] = useState<string | null>(null);
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
  return (
    <View>
      <Text>{chatid}</Text>
    </View>
  );
};

export default Page;
