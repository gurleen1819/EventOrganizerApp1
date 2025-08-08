// navigation/RootNavigator.js
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import EventsScreen from "../screens/EventsScreen";
import CreateEditEventScreen from "../screens/CreateEditEventScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { AuthContext } from "../contexts/AuthProvider";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, initializing } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Events" component={EventsScreen} options={{ title: "All Events" }} />
            <Stack.Screen name="CreateEdit" component={CreateEditEventScreen} options={{ title: "Create / Edit Event" }} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: "Sign In" }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "Sign Up" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
