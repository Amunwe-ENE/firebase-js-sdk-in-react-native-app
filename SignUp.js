import React from 'react'
import { StyleSheet, Text, TextInput, View, ActivityIndicator, Button, ScrollView } from 'react-native'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager,AccessToken } from 'react-native-fbsdk';
import {    Colors  } from 'react-native/Libraries/NewAppScreen';

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null,isLoading:false }

  handleSignUp = () => {
    this.setState({isLoading: true})
    const { email, password } = this.state
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {this.props.navigation.navigate('Home')
      this.setState({isLoading: false})
    })
      .catch(error => {
        this.setState({ errorMessage: error.message })
      this.setState({isLoading: false})
    })
  }
  handleGoogleSignIn = async () => {
    
    await GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '1045040137199-32lcncjerd4cttr9d9hbkq5m99qfi7hb.apps.googleusercontent.com', // required
    });
    const { accessToken, idToken } = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    const {currentUser} = await firebase.auth().signInWithCredential(credential); 
    this.setState({isLoading:false})
    if(currentUser){
      this.props.navigation.navigate('Home')
    }
  }

  handleFacebookSignIn = async ()=>{
    this.setState({isLoading:true})
    // Login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    
    if (result.isCancelled) {
      
      this.setState({ errorMessage: 'User cancelled the login process' })
      this.setState({isLoading:false})
      throw new Error('User cancelled the login process');
    }
    
    const data = await AccessToken.getCurrentAccessToken();
    
    if (!data) {
      
      this.setState({ errorMessage: 'Something went wrong obtaining access token' })
      this.setState({isLoading:false})
      throw new Error('Something went wrong obtaining access token');
    }
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    const {currentUser} = await firebase.auth().signInWithCredential(credential);
    this.setState({isLoading:false})
    if(currentUser){
      this.props.navigation.navigate('Home')
    }
  }
  render() {
    return (
      <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    style={styles.scrollView}>
      <View style={styles.sectionContainer}>
          <View style={styles.row}>
          <Button style={styles.google} title="Sign up with Google"

          onPress={this.handleGoogleSignIn}
          />
          <Button style={styles.facebook} title=" Facebook Signup" 
          onPress={this.handleFacebookSignIn}
          />
          </View>
        </View><Text style={styles.center}>or</Text>
        {this.state.isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {this.state.errorMessage && !this.state.isLoading &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
          <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Email</Text>
        <TextInput
          placeholder="Type email here"
          autoCapitalize="none"
         
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        /></View>
        <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Password</Text>
        <TextInput
          secureTextEntry
          placeholder="Type password here"
          autoCapitalize="none"
          
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        /></View>
        <View style={styles.sectionContainer}>
        <Button title="Sign Up" onPress={this.handleSignUp} /></View>
        <View style={styles.sectionContainer}>
        <Text
          
          onPress={() => this.props.navigation.navigate('SignIn')}
        >Already have an account? Login</Text>
      </View></ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  row: {
    flex:1,
    flexDirection: 'row',
    justifyContent: "space-around"
},
google:{
  backgroundColor: 'red'
},
facebook: {

},
center:{
  flex:1,
  justifyContent: 'center',
  textAlign: 'center'
}
})

