import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, Easing, ImageBackground } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useAuth } from '../Context/AuthContext';
import getBaseUrl from '../config';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const [BASEURL,setBaseUrl]=useState('');

  useEffect(() => {
    const fetchBaseUrl = async () => {
        try {
            const BASEURL = await getBaseUrl();
            setBaseUrl(BASEURL);
        } catch (error) {
            console.error("Error fetching BASEURL:", error);
        }
    };

    fetchBaseUrl(); // Call the async function immediately
}, []);
console.log("BASE",BASEURL)
  // const [loginTop, setLoginTop] = useState(0);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  //--------------------SignUp--------------------
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cin, setCin] = useState('');
  const [usernameSU, setUserNameSU] = useState('');
  const [passwordSU, setPasswordSU] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [errorEmail, seterrorEmail] = useState('');
  const [errorPhone, seterrorPhone] = useState('');
  const [errorPassword, seterrorPassword] = useState('');
  const [errorConfPass, seterrorConfPass] = useState('');
  const [errorAll, seterrorAll] = useState('*All fields are required');

  const [profile, setProfile] = useState('');
  const [error2, setError2] = useState('');


  const [showSignUp, setShowSignUp] = useState(false); // State to manage SignUp form visibility

  // const loginRef = useRef(null);
  const { login, error } = useAuth();
  const handleLogin = () => {
    try {
      login(username, password);
      if (error) {
        setError2('Login failed !');
      }
      else setError2('');

    } catch (error2) {

      console.log('Login failed', error);
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


  const handleSignup = async () => {
    if (email == '' || phone == '' || passwordSU == '' || confirmPass == '' || firstname == '' || lastname == '' || cin == '' || usernameSU == '') {
      seterrorAll('*All fields are required');
      return;
    }
    else {
      seterrorAll('');
    }
    if (passwordSU != confirmPass) {
      seterrorConfPass('*Passwords do not match');
      return;
    }
    else {
      seterrorConfPass('');
    }
    // regex for password
    if (!passwordSU.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
      seterrorPassword('*Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character');
      return;
    }
    else {
      seterrorPassword('');
    }
    if (isNaN(phone)) {
      seterrorPhone('*Phone number must contain only numbers');
      return;
    }
    else if (phone.length != 10) {
      seterrorPhone('*Phone number must contain 10 numbers');
    }
    else {
      seterrorPhone('');
    }
    if (!email.includes('@') ) {
      seterrorEmail('*Invalid email');
      return;
    }
    else {
      seterrorEmail('');
    }
  
    const newUser = {
      username: usernameSU,
      password: passwordSU,
      email: email,
      firstname: firstname,
      lastname: lastname,
      profile: {
        cin: cin,
        telephone: phone,
        role: "xcfvgj",
        id_cop: 3,
      },
    };

    try {
      const response = await fetch(`${getBaseUrl()}/api/users/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
    } catch (error2) {
      console.log('Error2 deleting user:', error2.message);
      alert(error2.message)

    }

    alert('User created successfully, check your email to activate your account')
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
              {error2 !== '' && (
                <View style={styles.errorContainer}>
                  <Ionicons name={'warning-outline'} size={24} color="red" />
                  <Text style={styles.errorText}>{error2}</Text>
                </View>
              )}

              <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}>
                <Text style={styles.LoginButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.SignUpButton} onPress={toggleSignUp}>
                <Text style={styles.SignUpButtonText}>Sign Up</Text>
              </TouchableOpacity>
              <View style={{ transform: [{ translateX: -180 }] }}>
                <Image
                  source={require('../assets/images/wave.gif')} // Replace with the actual path to your GIF
                  style={[StyleSheet.absoluteFill, { width: '150%', height: 100, marginTop: 10, bottom: 0 }]}
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
           { errorEmail &&(<Text style={{ color: 'red', marginBottom: 1 }}>{errorEmail}</Text>)}
           { errorPhone &&(<Text style={{ color: 'red', marginBottom: 1 }}>{errorPhone}</Text>)}
           { errorPassword &&(<Text style={{ color: 'red', marginBottom: 1 }}>{errorPassword}</Text>)}
           { errorConfPass &&(<Text style={{ color: 'red', marginBottom: 1 }}>{errorConfPass}</Text>)}
           { errorAll &&(<Text style={{ color: 'red', marginBottom: 1 }}>{errorAll}</Text>)}
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
                style={[StyleSheet.absoluteFill, { tintColor: '#3b67bb', width: '150%', height: 50, marginTop: 10, bottom: 0 }]}
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
  Error: {
    color: 'red',
    marginBottom: 10
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
  errorContainer: {
    flexDirection: 'row', // Horizontal layout
    alignItems: 'center', // Center items vertically
    marginBottom: 10, // Adjust spacing as needed
  },

  errorText: {
    color: 'red',
    marginLeft: 5, // Adjust spacing between icon and text
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