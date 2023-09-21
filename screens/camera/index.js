import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, Image, ImageBackground, Pressable } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome,  MaterialIcons ,FontAwesome5} from '@expo/vector-icons';

import { StyleSheet } from "react-native";

const Camerascreen = ({ navigation })=>{
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = React.useRef();
    const [previewUri, setPreviewUri] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);
  
    const cameraOptions = { quality: 1.0, base64: false, skipProcessing: true };
  
    const onPictureClick = React.useCallback(async () => {
      if (!cameraRef.current) return;
  
      const start = Date.now();
        console.log(Date());
      const photo = await cameraRef.current.takePictureAsync({ skipProcessing: true });
      console.log(Date());

      //console.log('onPictureClick', photo);
      const end = Date.now();
  
      if (photo) {
        // setDuration(end - start);
        setPreviewUri(photo.uri);
      }
    }, [cameraRef]);
  
  
    //Like componentDidMount - Permissions 
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
  
    //Snap media
    let previewUriToggleOff = () => {
      setPreviewUri(null);
    }
  
    // ------------ Preview image after click 
    if (previewUri) {
      console.log('njnl', previewUri);
      return (
        <View style={styles.container}>
          <ImageBackground source={{ uri: previewUri }} style={styles.imageBackground}>
            <View style={styles.imageButtons}>
              <Pressable style={styles.backButton} onPress={() => {
          // Navigate to Screen2 and pass a parameter
                  navigation.navigate('Form', { photoUri: previewUri });
                }}>
                <Text style={styles.submit}>إرسال</Text>
                <MaterialIcons name="arrow-back" size={30} color='#8FB339'  />
              </Pressable>
              <Pressable style={styles.redoButton} onPress={previewUriToggleOff}>
                <FontAwesome5 name="redo" size={24} color="#FF6B35" />
              </Pressable>
              
            </View>
          </ImageBackground>
        </View>
      );
    }
  
  // ------------ Camera View
    return (
      <View style={styles.container}>
        <Camera style={styles.camera}
          type={type}
          ref={cameraRef}
          ratio='16:9'
        >
          <View style={styles.cameraButtons}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <FontAwesome
                name="camera-retro" // Replace with the FontAwesome icon name you want to use
                color="white"
                size={40}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButton} onPress={onPictureClick}>
              <View style={styles.captureCircle}>
                <View style={styles.captureInnerCircle} />
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
};

export default Camerascreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 0,
    width: '100%',
  },
  imageBackground: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    justifyContent: 'flex-end',
  },
  imageButtons: {
    flex: 0.05,
    marginLeft: 40,
    marginRight: 40,
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: 'white',
    borderWidth:5,
    width:150,
    height:80,
    borderRadius:40,
    alignItems:'center',
    display:'flex',
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    padding:10,
  },
  redoButton: {
    backgroundColor: 'white',
    borderWidth:5,
    width:80,
    height:80,
    borderRadius:40,
    alignItems:'center',
    display:'flex',
    flexDirection:'row-reverse',
    justifyContent:'center',
    padding:10,
  },
  submit:{
    fontSize:23,
    fontFamily: 'noto-kufi-arabic', // This should apply the custom font
    color:'#8FB339',
  },
  lockButton: {
    backgroundColor: 'transparent',
  },
  camera: {
    flex: 1,
  },
  cameraButtons: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  flipButton: {
    flex: 0.1,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 20,
    right: 35,
  },
  captureButton: {
    alignSelf: 'center',
  },
  captureCircle: {
    borderWidth: 2,
    borderRadius: 70 / 2,
    borderColor: 'white',
    height: 70,
    width: 70,
    bottom: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInnerCircle: {
    borderWidth: 2,
    borderRadius: 60 / 2,
    borderColor: 'white',
    height: 60,
    width: 60,
    backgroundColor: 'white',
  },
});
