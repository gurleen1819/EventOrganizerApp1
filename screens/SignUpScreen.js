// screens/SignUpScreen.js
import React, { useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthProvider";

export default function SignUpScreen({ navigation }) {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = async () => {
    if (!email || !password) return Alert.alert("Please enter email and password");
    if (password.length < 6) return Alert.alert("Password must be at least 6 characters");
    try {
      await signUp(email.trim(), password);
    } catch (e) {
      Alert.alert("Sign up failed", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up" onPress={handle} />
      <Text style={{ marginTop:12 }} onPress={() => navigation.goBack()}>Have an account? Sign in</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex:1, justifyContent:"center", padding:16 },
  title: { fontSize:24, fontWeight:"600", marginBottom:18, textAlign:"center" },
  input: { borderWidth:1, borderColor:"#ddd", padding:10, borderRadius:8, marginBottom:12 }
});
