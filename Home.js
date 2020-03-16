
import React,{ useState, useEffect } from 'react';
import {  SafeAreaView, StyleSheet, ScrollView,
  View,Text, TextInput,  StatusBar, Button, ActivityIndicator} from 'react-native';
  import auth from '@react-native-firebase/auth'
  import functions from '@react-native-firebase/functions';
 

import {  Colors} from 'react-native/Libraries/NewAppScreen';
 const Home = ({navigation}) => {
     const [user, setUser] = useState({currentUser: null})
     const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErroMessage] = useState(null)
    const [firstname, setFirstName]= useState('')
    const [lastname, setLastname]= useState( '')
    const [dateofbirth, setDateOfBirth]= useState( '')
    const [summary, setSummary]= useState('')
    const [name, setName]= useState( '')
    const [email, setEmail]= useState('')
    
    
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
               if(user){
               setName(`${user.displayName}`)
               setEmail(`${user.email}`)}
              
                navigation.navigate(user ? 'Home' : 'SignIn')
              }
              const sendMail2 = () =>{
                fetch('https://us-central1-test-app-7aa0e.cloudfunctions.net/emailMessage', {
                    method: 'POST', // or 'PUT'
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({firstname,
                      lastname,
                      dateofbirth,
                      summary,
                      email:'eneamunwe@gmail.com'}),
                  })
                  .then((response) => response.json())
                  .then((data) => {
                    setErroMessage( data.message);
                      setIsLoading(false)
                  })
                  .catch((e) => {
                    setIsLoading(false)
                    setErroMessage( `${e}`);
                  });
              }
              const sendMail = ()=>{ 
                setIsLoading(true)
                fetch('https://us-central1-test-app-7aa0e.cloudfunctions.net/emailMessage', {
                      method: 'post',
                      body: JSON.stringify({firstname,
                        lastname,
                        dateofbirth,
                        summary,
                        email:"eneamunwe@gmail.com"})
                    }).then(function(response) {
                      return response.json();
                    }).then(function(data) {
                      setErroMessage( data.message);
                      setIsLoading(false)
                    }).catch(e => {
                      setIsLoading(false)
                      setErroMessage( `${e}`);
                    })
              }
             const submit = async () =>{
            //   async function sendEmail() {
                setIsLoading(true)
                try {
                  const success = await functions().httpsCallable('emailMessage')({
                    firstname,
                    lastname,
                    dateofbirth,
                    summary,
                    email:"eneamunwe@gmail.com"
                  });
               
                  if (success) {
                    setErroMessage( 'Email send successfully');
                    setIsLoading(false)
                  } else {
                    console.warn('Woops, looks like something went wrong!');
                  }
                  
                } catch (e) {
                    setIsLoading(false)
                    setErroMessage( `${e}`);
                }
              }
    return(
     
 <ScrollView
     contentInsetAdjustmentBehavior="automatic"
     style={styles.scrollView}>
       <View style={styles.sectionContainer}> 
    <Text style={styles.sectionTitle}>{name}</Text>
     <Text >{`${email}`}</Text>
   </View>
     <View style={styles.sectionContainer}>
      
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {errorMessage && !isLoading &&
        <Text style={{ color: 'red' }}>
          {errorMessage}
        </Text>}</View>

     <View style={styles.body}>
     <View style={styles.sectionContainer}>
     <Text style={styles.sectionTitle}>First Name</Text>
     <TextInput
           
           autoCapitalize="none"
           placeholder="First Name"
           onChangeText={firstname => setFirstName(firstname )}
          value={firstname}
         />
         
   </View>
   <View style={styles.sectionContainer}>
     <Text style={styles.sectionTitle}>Last Name</Text>
     <TextInput
           
           autoCapitalize="none"
           placeholder="Last Name"
           onChangeText={lastname => setLastname( lastname )}
          value={lastname}
         />
        
   </View>
   <View style={styles.sectionContainer}>
     <Text style={styles.sectionTitle}>Date of Birth</Text>
     <TextInput
           
           autoCapitalize="none"
           placeholder="Date of Birthdateofbirth" 
           onChangeText={dateofbirth => setDateOfBirth(dateofbirth )}
          value={dateofbirth} 
         />
   </View>
   <View style={styles.sectionContainer}>
     <Text style={styles.sectionTitle}>Summary</Text>
     <TextInput
           firstname
           autoCapitalize="none"
           placeholder="Summary"
           onChangeText={summary => setSummary(summary)}
          value={summary}
         />
        
   </View>
   <View style={styles.sectionContainer}>
         <Button
         title="Send Via Email"
         onPress={ sendMail2}
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