import React,{useState,useEffect} from 'react';
import {View, ScrollView, Text, StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
const Writepage = ({route}) => {
  const navigation = useNavigation();
  const {id,note} = route?.params;
  const [myData, setmyData] = useState(note);
  mynoteFun = (v) => {   
    console.log(v)
    setmyData(v)
  }
  
  const UpdateNote = ()=>{
    firestore()
    .collection('notes')
    .doc(id)
    .update({
      note: myData,
      updated_at:new Date().getTime()
    })
    .then(() => {
      console.log('Note updated!');
      navigation.navigate('Home');
    });
  }
  const AddNote = ()=>{
    firestore()
    .collection('notes')
    .add({
      note: myData,
      updated_at: new Date().getTime(),
    })
    .then(() => {
      console.log('Note added!');
    });
  }

  return (
    <View style={{flex: 1}}>
      
      <TextInput 
        style={{ flex: 1, textAlignVertical: 'top',zIndex:77777,fontSize:20,padding:15,}} 
        autoFocus={true} 
        placeholder="write your record..."
        value={myData}
        onChangeText={(e)=>mynoteFun(e)}
        multiline={true}>
        </TextInput>
      <TouchableOpacity onPress={id?UpdateNote:AddNote} style={styles.plassHolder}>
        <Text style={{...styles.addButton, textAlign: 'center'}}>
          <FontAwesomeIcon icon={faCheck} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  plassHolder: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex:9999999,
  },
  addButton: {
    backgroundColor: '#02de48',
    width: '20%',
    padding: 12,
    borderRadius: 20,
  },
  bgLine:{
    position:"absolute",
    flex:1,
    top:0,
    width:"100%",
    height:40,
    zIndex:0
  },
  Line:{
    width:"100%",
    height:30,
    borderBottomColor:"red",
    borderBottomWidth:1
  }
});

export default Writepage;
