import React, { useEffect, useState } from 'react';
import {
    View,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Pressable,
    Keyboard,
    Image
  } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useForm, Controller } from 'react-hook-form';
import * as Location from 'expo-location';
import styles from '../form/styles';
import { MaterialIcons ,Octicons} from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const backendUrl = 'http://192.168.1.14:8800';
const CustomPickerItem = ({ label, value }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'noto-kufi-arabic', marginRight: 10 }}>{label}</Text>
    </View>
  );
};

const Form = ({ navigation }) => {

  const route = useRoute();
  const { photoUri } = route.params;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedValue, setSelectedValue] = useState(''); // Initialize with an empty string
  const [open, setOpen] = useState(false); // Initialize as closed
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handlePickerChange = (itemValue) => {
    setSelectedValue(itemValue);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude); // Set latitude
      setLongitude(location.coords.longitude); // Set longitude
    })();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    try {
      // Create a FormData object to send data including an image
      const formData = new FormData();
      formData.append('nom', data.firstName);
      formData.append('prenom', data.lastName);
      formData.append('tel', data.phoneNumber);
      formData.append('category', selectedValue);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
  
      // Append the image to the FormData (assuming you have the 'photoUri' variable)
      formData.append('image', {
        uri: photoUri,
        type: 'image/jpeg', // Adjust the type if necessary
        name: 'photo.jpg',  // Adjust the name if necessary
      });
  
      // Make an HTTP POST request to your backend
      const response = await axios.post(`${backendUrl}/holes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Handle a successful response from the server
      console.log('Response from the server:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
    }
  };
  

  const customButtonStyle = {
    backgroundColor: isValid ? '#FF6B35' : 'gray',
    padding: 4,
    borderRadius: 10,
    marginTop: 5,
    height:60,
    width:'40%',
    borderWidth:4,
    justifyContent:'center',
    display:'flex',
    flexDirection:'row-reverse',
    alignItems:'center',
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
            <Pressable style={styles.return}>
                <MaterialIcons
                name="arrow-back"
                size={40}
                color="#FF6B35"
                onPress={() => {
                  navigation.navigate('camera');
                }}
                />
            </Pressable>
            <Image
                source={{ uri: photoUri }}
                style={{
                width: '50%',
                height: 300,
                resizeMode: 'cover',
                borderRadius: 20,
                borderColor: '#1a659e',
                borderWidth: 4,
                }}
            />
            <Text style={styles.label}>الاسم:</Text>
            <Controller
                control={control}
                name="firstName"
                style={styles.name}
                render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                    placeholder="الإسم"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    style={styles.input}
                />
                )}
                rules={{
                required: {
                    value: true,
                    message: 'First Name is required!',
                },
                }}
            />
            {errors.firstName && <Text style={styles.error}>إدخال الإسم اجباري</Text>}
            <Text style={styles.label}>اللقب:</Text>
            <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                    placeholder="اللقب"
                    value={value}
                    onBlur={onBlur}
                    style={styles.input}
                    onChangeText={(value) => onChange(value)}
                />
                )}
                rules={{
                required: {
                    value: true,
                    message: 'Last Name is required!',
                },
                }}
            />
            {errors.lastName && <Text style={styles.error}>إدخال اللقب اجباري</Text>}
            <Text style={styles.label}>رقم الهاتف :</Text>
            <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                
                    placeholder="0-xxx-xxx-xxx"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    style={styles.input}
                />
                )}
                rules={{
                required: {
                    value: true,
                    message: 'Phone Number is required!',
                },
                }}
            />
            {errors.phoneNumber && <Text style={styles.error}>إدخال رقم الهاتف اجباري</Text>}
            <Text style={styles.label}>صنف المشكل :</Text>
            <View>
                <DropDownPicker
                open={open}
                value={selectedValue}
                items={[
                    { label: 'تسرب مياه قذرة', value: 'تسرب مياه قذرة' },
                    { label: 'تسرب مياه عذبة', value: 'تسرب مياه عذبة' },
                    { label: 'تراكم مخلفات بناء', value: 'تراكم مخلفات بناء' },
                    { label: 'تعطل انارة عمومية', value: 'تعطل انارة عمومية' },
                    { label: 'حفرة', value: 'حفرة' },
                    { label: 'بالوعة مغلقة', value: 'بالوعة مغلقة' },
                    { label: 'تراكم نفايات', value: 'تراكم نفايات' },
                    { label: 'تراكم اتربة', value: 'تراكم اتربة' },
                ]}
                setOpen={setOpen}
                setValue={setSelectedValue}
                style={styles.pick}
                placeholderStyle={{
                    fontFamily: 'noto-kufi-arabic',
                }}
                containerStyle={{ marginTop: 10 }}
                listItemLabelStyle={{ fontFamily: 'noto-kufi-arabic' }}
                dropDownContainerStyle={{
                    width: '50%',
                    height: 500, // You need to specify height as a number
                }}
                />
            </View>
            <Pressable
                style={({ pressed }) => [
                customButtonStyle,
                pressed && { opacity: 0.6 },
                ]}
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid}
            >
                {({ pressed }) => (
                <Text style={{ 
                  color: pressed && isValid ? 'white' : 'black' ,
                  fontFamily: 'noto-kufi-arabic', // This should apply the custom font
                  fontSize:20,
                  }}>
                    إرسال
                    <Octicons name="paper-airplane" size={24} color="black" />
                </Text>
                )}
            </Pressable>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Form;
