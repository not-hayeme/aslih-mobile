import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft:0,
        width:'100%',
        backgroundColor:"#dddedf",
        alignItems:'center',
        gap:2,
        justifyContent:'center',

    },
    
    input:{
        fontFamily: 'noto-kufi-arabic', // This should apply the custom font
        
        height:50,
        width:'50%',
        borderWidth:4,
        paddingVertical:10,
        paddingHorizontal:15,
        borderRadius:20,
        backgroundColor:"#C1D6E2",
        borderColor:'#1a659e',
    },
    return:{
        position:'absolute',
        top:60,
        left:30,
    },
    label:{
        fontFamily: 'noto-kufi-arabic', // This should apply the custom font
        
    },
    pick:{
        height:50,
        width:'50%',
        borderRadius:20,
        borderWidth:4,
        backgroundColor:"#C1D6E2",
        borderColor:'#1a659e',
        fontFamily: 'noto-kufi-arabic', // This should apply the custom font

    },
    error:{
        color:"red",
        fontFamily: 'noto-kufi-arabic', // This should apply the custom font
        fontSize:10,
    }
});
export default styles;