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

function HomeScreen({ navigation }) {
  const [myData, setmyData] = useState();
  const getDataFromFirestore = async ()=>{
      const users = await firestore().collection('notes').get();
      setmyData(users['_docs'])
      
  }

  useEffect(() => {   
      getDataFromFirestore();
    
  },[myData]);

  

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {
          myData?.map((note,index) => <Note key={index} note={note} noteId={note["_ref"]['_documentPath']['_parts'][1]} /> )
        }
      </ScrollView>
      <TouchableOpacity style={styles.plassHolder} onPress={() => navigation.navigate('Write',{id:null,note:null})}>
          <Text style={{...styles.addButton,textAlign:"center"}}><FontAwesomeIcon icon={ faAdd } /></Text>
      </TouchableOpacity>
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
      <Text style={{fontSize:20}}>Notes</Text>
      {
       searchbar&&<TextInput autoFocus={true} style={{...styles.searchBar}}></TextInput>
      }
      <View>
        <TouchableOpacity onPress={showSearchBar}>
          <Text style={{fontSize:20}}><FontAwesomeIcon icon={ faMagnifyingGlass } /></Text>
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
              backgroundColor: '#0cb3fa',
            },
            headerTintColor: '#0cdefa',
            }}
        />
        <Stack.Screen name="Write" component={NoteWriteScreen} />
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
  plassHolder:{
    position:"absolute",
    bottom:20,
    width:"100%",
    display:'flex',
    justifyContent:"center",
    flexDirection:"row",

  },
  addButton:{
    backgroundColor:"#0cb3fa",
    width:"20%",
    padding:12,
    borderRadius:20
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