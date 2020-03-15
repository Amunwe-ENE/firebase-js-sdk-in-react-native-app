
import React,{ useState, useEffect } from 'react';
import {  SafeAreaView, StyleSheet, ScrollView,
  View,Text, TextInput,  StatusBar, Button} from 'react-native';
  import auth from '@react-native-firebase/auth'
  import functions from '@react-native-firebase/functions';
 

import {  Colors} from 'react-native/Libraries/NewAppScreen';
 const Home = ({navigation}) => {
     const [user, setUser] = useState({currentUser: null})
    const [state, setState] = useState({  
        errorMessage: null,
                firstname: '',
                lastname:'',
                dateofbirth: '',
                summary: ''
              })
    const [options, setOptions]= useState({firstName: '',
    lastName:'',
    dateOfBirth: '',
    summary: '',
    email:'eneamunwe@yahoo.com'})
   
    useEffect( () => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        
        return subscriber; // unsubscribe on unmount
      }, []);
    useEffect(()=> {auth()},[]);
              // Handle user state changes
              const handleSignOut=() =>{
                auth().signOut()
              }
              onAuthStateChanged = (user) => {
               setUser({currentUser:user})
                navigation.navigate(user ? 'Home' : 'SignIn')
              }
             const submit = async () =>{
            //   async function sendEmail() {
                try {
                  const success = await functions().httpsCallable('emailMessage')({
                    ...options
                  });
               
                  if (success) {
                    setState({errorMessage: 'Email send successfully'});
                  } else {
                    console.warn('Woops, looks like something went wrong!');
                  }
                  navigation.navigate('SignIn')
                } catch (e) {
                    setState({errorMessage: `Error: ${e}`});
                }
              }
    return(
     
 <ScrollView
     contentInsetAdjustmentBehavior="automatic"
     style={styles.scrollView}>
     
     <View style={styles.body}>
     <View style={styles.sectionContainer}>
     <Text style={styles.sectionTitle}>First Name</Text>
     <TextInput
           
           autoCapitalize="none"
           placeholder="First Name"
           onChangeText={firstname => setState({ firstname })}
          value={state.firstname}
         />
         
   </View>
   <View style={styles.sectionContainer}>
     <Text style={styles.sectionTitle}>Last Name</Text>
     <TextInput
           
           autoCapitalize="none"
           placeholder="Last Name"
           onChangeText={lastname => setState({ lastname })}
          value={state.lastname}
         />
        
   </View>
   <View style={styles.sectionContainer}>
     <Text style={styles.sectionTitle}>Date of Birth</Text>
     <TextInput
           
           autoCapitalize="none"
           placeholder="Date of Birthdateofbirth" 
           onChangeText={dateofbirth => setState({ dateofbirth })}
          value={state.dateofbirth} 
         />
   </View>
   <View style={styles.sectionContainer}>
     <Text style={styles.sectionTitle}>Summary</Text>
     <TextInput
           firstname
           autoCapitalize="none"
           placeholder="Password"
           onChangeText={summary => setState({summary })}
          value={state.summary}
         />
        
   </View>
   <View style={styles.sectionContainer}>
         <Button
         title="Send Via Email"
         onPress={ submit}
       />
   </View><View style={styles.sectionContainer}>
   {user != null  &&
   <Button
         title="Logout"
         onPress={ handleSignOut}
       />}</View>
   </View>
   <View style={styles.footer}></View>
   </ScrollView>
         
    )
  
}



export default Home
 const styles = StyleSheet.create({
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
   }
 });