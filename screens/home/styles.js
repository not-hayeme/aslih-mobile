import { StyleSheet } from "react-native";


const styles =StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft:0,
        width:'100%',
      },    
    image:{
        flex:1,
        width:'100%',
        justifyContent: 'center',
        alignItems:'center',
    },
    button:{
        backgroundColor:'#FF6B35',
        paddingVertical:10,
        paddingHorizontal:20,
        marginTop:50,
        borderRadius:25,
        
    },
    buttontext:{
        fontFamily: 'noto-kufi-arabic', // This should apply the custom font
        fontSize:30,
        color:'white',
    }
});

export default styles;