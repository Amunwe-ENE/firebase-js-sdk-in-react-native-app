import React from 'react'
import { StyleSheet, Text,ActivityIndicator, TextInput, View, Button,ScrollView,StatusBar, SafeAreaView } from 'react-native'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import { Colors  } from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager,AccessToken } from 'react-native-fbsdk';

 

export default class SignIn extends React.Component {
  state = { email: '', password: '', errorMessage: null,isLoading:false }
<<<<<<< Updated upstream

 
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
=======
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.props.navigation.navigate('Home')
      }
    })
  }
 
  handleGoogleSignIn = async () => {
   
     
      this.setState({isLoading:true})
      try{
        await GoogleSignin.configure({
          scopes: ['https://www.googleapis.com/auth/contacts.readonly','https://www.googleapis.com/auth/androidpublisher', 'profile','email'],
          webClientId: '1045040137199-hktsot474fqlafsa7jje7d1k84nkdq44.apps.googleusercontent.com' // required
        });
      }catch(e){
        this.setState({errorMessage: `1; ${e}`})
        this.setState({isLoading:false})
      }
        //  GoogleSignin.signIn().then(cred =>{
        //  const { accessToken, _idToken } = cred
        //  return {accessToken, _idToken}
        //  }).catch(e=>{
        //   this.setState({isLoading:false})
        //   this.setState({ errorMessage: `1 ${e.message}` })
        //  })
        const {accessToken, idToken} = await GoogleSignin.signIn()
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
   
      firebase.auth().signInWithCredential(credential).then(()=>{
        this.setState({isLoading:false})
        this.setState({ errorMessage: null})
      this.props.navigation.navigate('Home')
      }).catch(e=>{
        this.setState({isLoading:false})
        this.setState({ errorMessage: `Code: ${e.code} - Message: ${e.message}` })
     
      });
    // }catch(e){
    //   this.setState({errorMessage: `3: ${e}`})
    //   this.setState({isLoading:false})
    // }
    
    

  }
>>>>>>> Stashed changes
    
  handleFacebookSignIn = async ()=>{
    this.setState({isLoading:true})
    // Login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    
    if (result.isCancelled) {
<<<<<<< Updated upstream
      throw new Error('User cancelled the login process');
      this.setState({ errorMessage: 'User cancelled the login process' })
=======
      this.setState({ errorMessage: 'User cancelled the login process' })
      
      this.setState({isLoading:false})
      throw new Error('User cancelled the login process');
      
>>>>>>> Stashed changes
    }
    
    const data = await AccessToken.getCurrentAccessToken();
    
    if (!data) {
<<<<<<< Updated upstream
      throw new Error('Something went wrong obtaining access token');
      this.setState({ errorMessage: 'Something went wrong obtaining access token' })
=======
      this.setState({ errorMessage: 'Something went wrong obtaining access token' })
      this.setState({isLoading:false})
      throw new Error('Something went wrong obtaining access token');
      
>>>>>>> Stashed changes
    }
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    const {currentUser} = await firebase.auth().signInWithCredential(credential);
    this.setState({isLoading:false})
    if(currentUser){
<<<<<<< Updated upstream
=======
      this.setState({ errorMessage: null })
>>>>>>> Stashed changes
      this.props.navigation.navigate('Home')
    }
  }

  handleLogin = () => {
<<<<<<< Updated upstream
      this.setState({isLoading:true})
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {this.props.navigation.navigate('Home')
      this.setState({isLoading: false})
    })
      .catch(error => {this.setState({ errorMessage: error.message })
      this.setState({isLoading:false})})
=======
      
    const { email, password } = this.state
    if(!email && !password){this.setState({ errorMessage: 'Email or Pasword field is empty' })}else{
      this.setState({isLoading:true})
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ errorMessage: null })
        this.props.navigation.navigate('Home')
      this.setState({isLoading: false})
    })
      .catch(error => {this.setState({ errorMessage: error.message })
      this.setState({isLoading:false})})}
>>>>>>> Stashed changes
  }

  render() {
    return (
        
      <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    style={styles.scrollView}>
      <View style={styles.body}>
      <View style={styles.sectionContainer}>
          <View style={styles.row}>
          <Button style={styles.google} title="Sign in with Google"  
          onPress={this.handleGoogleSignIn}
          />
          <Button style={styles.facebook} title=" Facebook Login" 
            onPress={this.handleFacebookSignIn}
          />
          </View>
        </View>
         <View style={styles.sectionContainer}>
      
        {this.state.isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {this.state.errorMessage && !this.state.isLoading &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}</View>
          <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>Email</Text>
        <TextInput
          
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        /></View>
        <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Password</Text>
        <TextInput
          secureTextEntry
    
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        /></View>
        <View style={styles.sectionContainer}>
        <Button title="Login" onPress={this.handleLogin} />
       </View><View style={styles.sectionContainer}>
        <Text
          
          onPress={() => this.props.navigation.navigate('SignUp')}
        >Don't have an account? Sign Up</Text>
      </View>
      </View>
      </ScrollView>
     
      
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
    fontWeight: '500',
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

  }
})