import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, Easing, ImageBackground, Modal } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useAuth } from '../Context/AuthContext';
import getBaseUrl from '../config';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const LoginScreen = () => {

  const [BASEURL, setBaseUrl] = useState('');

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
  console.log("BASE", BASEURL)
  // const [loginTop, setLoginTop] = useState(0);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  //--------------------SignUp--------------------
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailForgot, setEmailForgot] = useState('');

  const [phone, setPhone] = useState('');
  const [cin, setCin] = useState('');
  const [usernameSU, setUserNameSU] = useState('');
  const [passwordSU, setPasswordSU] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [errorEmail, seterrorEmail] = useState('');
  const [errorPhone, seterrorPhone] = useState('');
  const [errorPassword, seterrorPassword] = useState('');
  const [errorConfPass, seterrorConfPass] = useState('');
  const [errorAll, seterrorAll] = useState('*Tous les champs sont obligatoires');

  const [profile, setProfile] = useState('');
  const [error2, setError2] = useState('');
  const [showModal, setShowModal] = useState(true)


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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Fonction de validation d'e-mail
  const isValidEmail = (email) => {
    return emailRegex.test(email);
  };

  // Fonction pour gérer les modifications de l'e-mail
  const handleEmailChange = (text, setEmailForgot) => {
    setEmailForgot(text); // Met à jour l'état de l'e-mail

    // Vous pouvez ajouter une logique de validation ici si nécessaire
  };
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
      seterrorAll('*Tous les champs sont obligatoires');
      return;
    }
    else {
      seterrorAll('');
    }
    if (passwordSU != confirmPass) {
      seterrorConfPass('*Les mots de passe ne correspondent pas');
      return;
    }
    else {
      seterrorConfPass('');
    }
    // regex for password
    if (!passwordSU.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
      seterrorPassword('*Le mot de passe doit contenir au moins 8 caractères, 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 caractère spécial');
      return;
    }
    else {
      seterrorPassword('');
    }
    if (isNaN(phone)) {
      seterrorPhone('*Le numéro de téléphone ne doit contenir que des chiffres');
      return;
    }
    else if (phone.length != 10) {
      seterrorPhone('*Le numéro de téléphone doit contenir 10 chiffres');
    }
    else {
      seterrorPhone('');
    }
    if (!email.includes('@')) {
      seterrorEmail('*Adresse e-mail invalide');
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
        role: "admin",
        id_cop: 3,
      },
    };

    try {
      const response = await fetch(`${BASEURL}/api/users/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      alert('Utilisateur créé avec succès, vérifiez votre e-mail pour activer votre compte')
    toggleSignUp();
    } catch (error2) {
      console.log('Error in signup:', error2.message);
      alert(error2.message)

    }

    
  };


  async function handleEmailSubmission() {
    const options = {
      method: 'GET',
      url: `${BASEURL}/forgot/${emailForgot}/`,
    };
    console.log('email',emailForgot)
    try {
      const response = await axios.request(options);
      console.log("data", response.data);
      setEmailForgot(''); // Réinitialise l'état de l'e-mail
    } catch (error) {
      setError2("Email inexistant")
      console.error("Error fetching data:", error);
      // Gérer les erreurs de requête ici
    }
  }
  

  return (


    <View style={styles.container} >
      <ImageBackground
        source={require('../assets/images/LoginBG.jpg')} // Replace with your image path
        style={styles.backgroundImage}
        blurRadius={5} // Adjust the blur radius as needed
      >
        {showModal && (
          <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowModal(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text>Entrer votre email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Entrez votre email"
                  value={emailForgot}
                  onChangeText={(text) => handleEmailChange(text, setEmailForgot)}
                />
                {!isValidEmail(emailForgot) && <Text style={{ color: 'red' }}>Email non valide</Text>}
                {error2==='Email inexistant' && <Text style={{ color: 'red' }}>{error2}</Text>}
                <View style={styles.buttonContainer}>

                  <TouchableOpacity
                    style={{ display: isValidEmail(emailForgot) ? 'flex' : 'none' }}
                    onPress={handleEmailSubmission}
                  >
                    <Text style={styles.buttonText}>Confirmer</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    setShowModal(false);
                    setEmailForgot('');
                  }
                  }>
                    <Text style={styles.buttonText}>Annuler</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}



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
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Text style={styles.ForgotButton} >Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {showSignUp && (
          <View style={styles.login}  >
            {errorEmail && (<Text style={{ color: 'red', marginBottom: 1 }}>{errorEmail}</Text>)}
            {errorPhone && (<Text style={{ color: 'red', marginBottom: 1 }}>{errorPhone}</Text>)}
            {errorPassword && (<Text style={{ color: 'red', marginBottom: 1 }}>{errorPassword}</Text>)}
            {errorConfPass && (<Text style={{ color: 'red', marginBottom: 1 }}>{errorConfPass}</Text>)}
            {errorAll && (<Text style={{ color: 'red', marginBottom: 1 }}>{errorAll}</Text>)}
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    color: '#3b67bb',
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