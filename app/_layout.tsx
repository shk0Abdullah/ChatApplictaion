import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Link, Stack } from "expo-router";
import { CirclePlus, X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayoutNav() {
  return (
    <ConvexProvider client={convex}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#EEA217",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "My Chats",

            headerRight: () => (
              <Link href={"/(modal)/create"} asChild>
                <TouchableOpacity>
                  <CirclePlus size={32} color="white" />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="(modal)/create"
          options={{
            headerTitle: "Start a Chat",
            headerTitleAlign: "center",
            presentation: "modal",
            headerLeft: () => (
              <Link href={"/"} asChild>
                <TouchableOpacity>
                  <X size={32} color="white" />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="(chat)/[chatid]"
          options={{
            headerTitle: "Chat",
          }}
        />
      </Stack>
    </ConvexProvider>
  );
}
