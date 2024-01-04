import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, Easing, ImageBackground } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useAuth } from '../Context/AuthContext';
import BASEURL from '../config';
const LoginScreen = () => {

  // const [loginTop, setLoginTop] = useState(0);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cin, setCin] = useState('');
  const [usernameSU, setUserNameSU] = useState('');
  const [passwordSU, setPasswordSU] = useState('');
  const [confirmPass, setconfirmPass] = useState('');

  const [showSignUp, setShowSignUp] = useState(false); // State to manage SignUp form visibility

  // const loginRef = useRef(null);
  const { login } = useAuth();
  const handleLogin = () => {
    try {
      login(username, password);
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  // const onLoginLayout = () => {
  //   if (loginRef.current) {
  //     loginRef.current.measure((x, y, width, height, pageX, pageY) => {
  //       setLoginTop(height);
  //     });
  //   }
  // };

  useEffect(() => {
    // startAnimation();
  }, []);

  let translateX1 = new Animated.Value(-160);

  // const startAnimation = () => {
  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(translateX1, {
  //         toValue: -850,
  //         duration: 6000,
  //         easing: Easing.inOut(Easing.sin), // Example: inOut using a sine curve
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(translateX1, {
  //         toValue: -160,
  //         duration: 6000,
  //         easing: Easing.inOut(Easing.sin), // Example: inOut using a sine curve
  //         useNativeDriver: true,
  //       }),
  //     ]),
  //   ).start();
  // };

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp); // Toggle SignUp form visibility
  };


  const handleSignup = () => {

    alert('signup Successfull')
    toggleSignUp();
  };


  return (


    <View style={styles.container} >
      <ImageBackground
        source={require('../assets/images/LoginBG.jpg')} // Replace with your image path
        style={styles.backgroundImage}
        blurRadius={5} // Adjust the blur radius as needed
      >
        <View style={styles.backgroundTint} />
        <Image
          source={require('../assets/images/Logo_White_text.png')}
          style={[
            styles.image,
            {
              width: 300,
              height: 150,
              marginTop: '-10%',
              zIndex: 1,
            },
          ]}
        />

        {/* onLayout={onLoginLayout} */}
        {!showSignUp && (
          <View style={{
            width: '100%',
            height: 'auto',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
            <View style={styles.login}>
              <TextInput
                style={styles.input}
                placeholderTextColor={"#607D8B"}
                placeholder="Username"
                value={username}
                onChangeText={(value) => setUserName(value)}
              />
              <TextInput
                style={styles.input}
                placeholderTextColor={"#607D8B"}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(value) => setPassword(value)}
              />

              <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}>
                <Text style={styles.LoginButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.SignUpButton} onPress={toggleSignUp}>
                <Text style={styles.SignUpButtonText}>Sign Up</Text>
              </TouchableOpacity>
              <View style={{ transform: [{ translateX: -180 }] }}>
  <Image
    source={require('../assets/images/wave.gif')} // Replace with the actual path to your GIF
    style={[StyleSheet.absoluteFill, { width: '150%', height: 100, marginTop: 20, bottom: 0 }]}
  />
</View>



            </View>
            <View style={styles.choiceText}>
              <TouchableOpacity>
                <Text style={styles.ForgotButton} >Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {showSignUp && (
          <View style={styles.login}  >
            <TextInput
              style={styles.inputS}
              placeholderTextColor={"#607D8B"}
              placeholder="cin"
              value={cin}
              onChangeText={(value) => setCin(value)}
            />
            <TextInput
              style={styles.inputS}
              placeholderTextColor={"#607D8B"}
              placeholder="firstname"
              value={firstname}
              onChangeText={(value) => setFirstName(value)}
            />
            <TextInput
              style={styles.inputS}
              placeholderTextColor={"#607D8B"}
              placeholder="lastname"
              value={lastname}
              onChangeText={(value) => setLastName(value)}
            />
            <TextInput
              style={styles.inputS}
              placeholderTextColor={"#607D8B"}
              placeholder="email"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
            <TextInput
              style={styles.inputS}
              placeholderTextColor={"#607D8B"}
              placeholder="phone"
              value={phone}
              onChangeText={(value) => setPhone(value)}
            />
            <TextInput
              style={styles.inputS}
              placeholderTextColor={"#607D8B"}
              placeholder="username"
              value={usernameSU}
              onChangeText={(value) => setUserNameSU(value)}
            />
            <TextInput
              style={styles.inputS}
              placeholderTextColor={"#607D8B"}
              placeholder="password"
              secureTextEntry={true}
              value={passwordSU}
              onChangeText={(value) => setPasswordSU(value)}
            />
            <TextInput
              style={styles.inputS}
              placeholderTextColor={"#607D8B"}
              placeholder="confirm password"

              secureTextEntry={true}
              value={confirmPass}
              onChangeText={(value) => setconfirmPass(value)}
            />

            <TouchableOpacity style={styles.LoginButton} onPress={handleSignup}>
              <Text style={styles.LoginButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.SignUpButton} onPress={toggleSignUp}>
              <Text style={styles.SignUpButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={{ transform: [{ translateX: -180 }] }}>
  <Image
    source={require('../assets/images/wave.gif')} // Replace with the actual path to your GIF
    style={[StyleSheet.absoluteFill, {tintColor: '#3b67bb', width: '150%', height: 50, marginTop: 10, bottom: 0 }]}
  />
</View>
          </View>
        )}

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({



  container: {
    //i want to use a blurred image as a background

    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#3b67bb', // Your color here
    opacity: 0.2, // Adjust opacity as needed
  },
  login: {
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    paddingVertical: 60,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',
    height: 'auto',
    shadowColor: '#3b67bb',//3b67bb
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,

    },
    elevation: 5,
    alignItems: 'center',
    position: 'relative',
  },

  waveContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  input: {
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#3b67bb20',
    width: '100%',
    borderWidth: 0,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  LoginButton: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'uppercase',
    width: '40%',
    height: 'auto',
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: '#3b67bb',
    transition: 'backgroundColor 300ms, transform 300ms',
  },

  LoginButtonText: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 35,

  },

  SignUpButton: {
    marginTop: 10,
    fontSize: 16,
    textTransform: 'uppercase',
    width: 100,
    height: 35,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: '#3b67bb10', //3b67bb
    transition: 'backgroundColor 300ms, transform 300ms',
  },

  SignUpButtonText: {
    color: '#3b67bb',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 35,

  },
  choiceText: {
    alignItems: 'center',
    fontSize: 5,
    fontWeight: 'bold',
    borderRadius: 5,
    zIndex: 3,
  },
  ForgotButton: {
    fontSize: 15,
    color: '#ffffff',
    shadowColor: '#3b67bb',//3b67bb
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,

    },
  },
  inputS: {
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#3b67bb20',
    width: '100%',
    borderWidth: 0,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 5,
  }
});

export default LoginScreen;
