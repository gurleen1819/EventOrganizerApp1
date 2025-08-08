import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "../contexts/AuthProvider";

export default function SignUpScreen({ navigation }) {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = async () => {
    if (!email || !password)
      return Alert.alert("Validation", "Please enter email and password");
    if (password.length < 6)
      return Alert.alert("Validation", "Password must be at least 6 characters");
    try {
      await signUp(email.trim(), password);
    } catch (e) {
      Alert.alert("Sign up failed", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>

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
        <Button title="Sign Up" onPress={handle} color="#f06292" />
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.signInText}>Have an account? Sign in</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "600",
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
  signInText: {
    textAlign: "center",
    color: "#f06292",
    fontWeight: "600",
  },
});
