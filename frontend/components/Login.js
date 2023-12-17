import React, { useRef, useState, useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Image,Animated,Easing,ImageBackground} from 'react-native';
import { Svg, Path } from 'react-native-svg';
const LoginScreen = () => {

  const [loginTop, setLoginTop] = useState(0);

  const loginRef = useRef(null);

  const onLoginLayout = () => {
    if (loginRef.current) {
      loginRef.current.measure((x, y, width, height, pageX, pageY) => {
        setLoginTop(height);
      });
    }
  };

  useEffect(() => {
    startAnimation();
  }, []);
  
  const translateX1 = new Animated.Value(-160);


  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX1, {
          toValue: -850,
          duration: 6000,
          easing: Easing.inOut(Easing.sin), // Example: inOut using a sine curve
          useNativeDriver: true,
        }),
        Animated.timing(translateX1, {
          toValue: -160,
          duration: 6000,
          easing: Easing.inOut(Easing.sin), // Example: inOut using a sine curve
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };


  return (

    <View style={styles.container}>

      <Image
        source={require('../assets/images/Logo_CoProLink_Text.png')}
        style={[
          styles.image,
          {
            width: 150,
            height: 150,
            top: loginTop - 266,
            zIndex: 1,
          },
        ]}
      />


      <View style={styles.login} ref={loginRef} onLayout={onLoginLayout}>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
        <TouchableOpacity style={styles.LoginButton} >
          <Text style={styles.LoginButtonText}>Login</Text>
        </TouchableOpacity>

        <View>

        </View>
          <Animated.View style={{ transform: [{ translateX: translateX1 }] }}>
            <Svg height="70" width="1000%" style={StyleSheet.absoluteFill}>
            <Path
    d="M0 30
       C 100 10, 200 50, 300 30
       S 500 10, 600 30
       S 800 50, 900 30
       S 1000 10, 1100 30
       L1000 60 
       L0 60 
       Z"
    fill="#3b67bb"
  />
            </Svg>
          </Animated.View>

      </View>
      <View style={styles.choiceText}>
        <TouchableOpacity>
          <Text style={styles.ForgotButton} >Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({



  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 16,
    textTransform: 'uppercase',
    width: 100,
    height: 35,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: '#ffffff',
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
    fontSize: 5,
    fontWeight: 'bold',
    borderRadius: 5,
    padding: 5,
    zIndex: 3,
  },
  ForgotButton: {
    fontSize: 15,
    color: '#3b67bb',
    shadowColor: '#3b67bb',//3b67bb
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,

    },
  },
});

export default LoginScreen;
