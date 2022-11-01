import styled from "styled-components/native"

export const PlaceHolderCss = styled.TouchableOpacity`
    position:absolute;
    bottom:20px;
    width:100%;
    display:flex;
    justify-content:center;
    flex-direction:row;
`;
export const AddButton = styled.View`
    background-Color:#0cb3fa;
    height:50px;
    width:50px;
    border-radius:100px;
    display:flex;
    justify-content:center;
    align-items:center;

`;
export const SaveBtn = styled.View`
    background-Color:#02de48;
    height:50px;
    width:50px;
    border-radius:100px;
    display:flex;
    justify-content:center;
    align-items:center;

`;

export const CardNote = styled.View`
    display: flex;
    justify-content: center;
    flex-direction: row;

`;
export const CardContent = styled.TouchableOpacity`
    background-Color:rgba(0,0,0,1);
    width:90%;
    padding:15px;
    margin:10px;
    border-Radius:3px;
    border: 1px solid grey;

`;

export const NoteText = styled.TouchableOpacity`
    font-size: 10px;
    margin-bottom: 20px;
    color: white;

`;

