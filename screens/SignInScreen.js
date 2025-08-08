import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";  // <-- import Icon
import { AuthContext } from "../contexts/AuthProvider";

export default function SignInScreen({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = async () => {
    if (!email || !password)
      return Alert.alert("Validation", "Please enter email and password");
    try {
      await signIn(email.trim(), password);
    } catch (e) {
      Alert.alert("Sign in failed", e.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Event icon */}
      <Icon name="event" size={64} color="#f06292" style={styles.icon} />

      <Text style={styles.title}>Event Organizer</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#bb7a90"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#bb7a90"
      />

      <View style={styles.buttonWrapper}>
        <Button title="Sign In" onPress={handle} color="#f06292" />
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f6",
    justifyContent: "center",
    padding: 16,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#ad1457",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f48fb1",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    color: "#ad1457",
  },
  buttonWrapper: {
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: "#ad1457",
  },
  link: {
    color: "#f06292",
    marginLeft: 6,
    fontWeight: "600",
  },
});
