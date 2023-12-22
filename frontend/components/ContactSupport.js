import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ContactSupport = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const sendEmail = () => {
    if (!subject.trim() || !body.trim()) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    // Simulating a successful alert when the form is submitted
    Alert.alert('Success', 'Email sent successfully');
    setSubject('');
    setBody('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Support</Text>
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={[styles.input, { height: 150 }]}
        placeholder="Message"
        multiline={true}
        value={body}
        onChangeText={setBody}
      />
      <TouchableOpacity style={styles.sendButton} onPress={sendEmail}>
        <Text style={styles.sendButtonText}>Send Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#fff',
    width: '80%',
    top: '10%',
    marginLeft: '10%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  sendButton: {
    backgroundColor: '#3b67bb',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ContactSupport;
