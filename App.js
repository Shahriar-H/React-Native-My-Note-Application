import React,{useState,useEffect} from 'react';
import { View, Text,Button,Image, StyleSheet, ScrollView, TouchableOpacity,TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass, faAdd } from '@fortawesome/free-solid-svg-icons'
import Note from './components/Note';
import Writepage from './components/Writepage';
import firestore from '@react-native-firebase/firestore';
import firebase from "@react-native-firebase/app"
import { PlaceHolderCss,AddButton } from './styled';

function HomeScreen({ navigation }) {
  const [myData, setmyData] = useState();
  const getDataFromFirestore = async ()=>{
      const users = await firestore().collection('notes').get();
      setmyData(users['_docs'])
      
  }

  useEffect(() => {   
      getDataFromFirestore();
    
  },[]);

  

  return (
    <View style={{flex: 1,backgroundColor:"rgba(10,10,10,1)"}}>
      <ScrollView>
        {
          myData?.map((note,index) => <Note key={index} note={note} noteId={note["_ref"]['_documentPath']['_parts'][1]} /> )
        }
      </ScrollView>
      <PlaceHolderCss onPress={() => navigation.navigate('Write',{id:null,note:null})}>
          <AddButton><FontAwesomeIcon icon={ faAdd } /></AddButton>
      </PlaceHolderCss>
    </View>
  );
}

function LogoTitle() {
  const [searchbar, setsearchbar] = useState(false);
  const showSearchBar = ()=>{
    setsearchbar((preState)=> !preState)
  }
  return (
    <View style={styles.headerStyle}>
      <Text style={{fontSize:20, color:"white"}}>Notes</Text>
      {
       searchbar&&<TextInput autoFocus={true} style={{...styles.searchBar}}></TextInput>
      }
      <View>
        <TouchableOpacity onPress={showSearchBar}>
          <Text style={{fontSize:20}}><FontAwesomeIcon color='white' icon={ faMagnifyingGlass } /></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function NoteWriteScreen({ route,navigation }) {
  return (
    <View style={{ flex: 1}}>
      <Writepage route={route}/>
      
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={
            { headerTitle: (props) => <LogoTitle {...props} />,
            headerStyle: {
              backgroundColor: '#212120',
              color:"white"
            },
            headerTintColor: '#0cdefa',
            }}
        />
        <Stack.Screen 
          name="Write" 
          component={NoteWriteScreen}
          options={
            {
            headerStyle: {
              backgroundColor: '#212120',

            },
            headerTintColor: '#0cdefa',
            }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    width:"96%",
    alignItems:"center"

  },
  
  
  searchBar:{
    backgroundColor:"white",
    width:"70%",
    height:35,
    borderRadius:4,
    paddingLeft:10,
  }
})

export default App;