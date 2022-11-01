import React,{useEffect} from 'react';
import { View,Text, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import { CardNote,CardContent } from '../styled';

const Note = ({note,noteId}) => {
    const navigation = useNavigation();
    const {note:myNote,updated_at} = note?._data || {}
    const deleteNote = ()=>{
        Alert.alert(
            "Delete",
            "Are want to delete this note?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                    firestore()
                    .collection('notes')
                    .doc(noteId)
                    .delete()
                    .then(() => {
                        console.log('Note deleted!');
                    });
              } }
            ]
        );
        
    }
    return (
        <CardNote>
            {note?._data?(
            <CardContent>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Write',{id:noteId,note:myNote})}>
                        <Text style={{fontSize:10,width:"100%",color:"grey",marginBottom:5}}>{noteId}</Text>
                        <Text style={{fontSize:17,marginBottom:20,color:"white"}}>
                            {myNote?.substr(0,70)+"...."}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.manageNote}>
                        <Text>{moment(updated_at).startOf('hour').fromNow()}</Text>
                        <TouchableOpacity onPress={deleteNote}>
                            <Text style={{color:"grey"}}><FontAwesomeIcon icon={ faTrash } color="grey" /></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </CardContent>
            ):<Text>Loading...</Text>}
        </CardNote>
    );
}

const styles = StyleSheet.create({
    
    
    manageNote:{
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center"
    }
})

export default Note;
