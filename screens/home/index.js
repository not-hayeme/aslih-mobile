import react from 'react';
import {View , 
        Text , 
        ImageBackground, 
        Pressable,
        Image,
    } from 'react-native';
import styles from './styles';
import Logo from '../../componants/logo';



const HomeScreen = ({ navigation })=>{
    return(
        <View style={styles.container}>
            <ImageBackground
            source={require('../../assets/background.png')}
            style={styles.image}
            >
                <Logo style={styles.logo} width={300} height={100} />
                <Pressable style={styles.button} onPress={() =>console.log("fuck u")
                }>
                    <Text style={styles.buttontext}>ارسل تبليغ</Text>
                </Pressable>
            </ImageBackground>
        </View>
    );
};

/*const HomeScreen = ({ navigation })=>{
    return(
        <View style={styles.container}>
            <ImageBackground
            source={require('../../assets/background.png')}
            style={styles.image}
            >
                <Logo style={styles.logo} width={300} height={100} />
                <Pressable style={styles.button} onPress={() => {
                  navigation.navigate('camera');
                }}>
                    <Text style={styles.buttontext}>ارسل تبليغ</Text>
                </Pressable>
            </ImageBackground>
        </View>
    );
};*/
export default HomeScreen;