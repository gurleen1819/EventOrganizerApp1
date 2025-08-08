// screens/SignInScreen.js
import React, { useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthProvider";

export default function SignInScreen({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = async () => {
    if (!email || !password) return Alert.alert("Please enter email and password");
    try {
      await signIn(email.trim(), password);
    } catch (e) {
      Alert.alert("Sign in failed", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GatherUp</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign In" onPress={handle} />
      <View style={styles.row}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={{ color: "#4e91fc", marginLeft: 6 }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex:1, justifyContent:"center", padding:16 },
  title: { fontSize:32, fontWeight:"700", marginBottom:18, textAlign:"center" },
  input: { borderWidth:1, borderColor:"#ddd", padding:10, borderRadius:8, marginBottom:12 }
});
