import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useForm, Controller, set } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'tailwind-react-native-classnames';

const Login = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setLoading] = useState(false)

    const storeData = async (value) => {
        // alert(JSON.stringify(value))
        try {
            for (const [key, val] of Object.entries(value)) {
                // alert(JSON.stringify(val))
                if (typeof val == 'number') {
                    await AsyncStorage.setItem(key, val ? JSON.stringify(val) : 'false')
                } else {
                    await AsyncStorage.setItem(key, val ? val : 'false')
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const onSubmit = async data => {
        setLoading(true)
        const param = {
            user: data.user,
            password: data.password,
            social: false
        }
        try {
            fetch(`https://gateway.vim365.com/users/checkuser?user=${param.user}&password=${param.password}&social=false`, {
                headers: {
                    'security-header': 'Vim365Aputek/2020.04'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                storeData(json)
                setLoading(false)
                navigation.navigate('Home', {
                    token: json.token,
                    id: json.id
                })
            })
            .catch((error) => {
                alert(error)
            });
        } catch(e) {
            alert(e)
        }
        
    };

    return (
        <View style={tw`flex h-full bg-gray-100`}>
            <View style={tw`py-8 items-center mb-4`}>
                <Image source={{uri: "https://veo365.com/assets/images/logo-veo-color-8.png"}} style={[tw`w-20 h-20`, { resizeMode: 'contain' }]} />
            </View>
            <Text style={tw`text-gray-800 text-3xl font-bold text-left mb-4 px-6`}>Iniciar sesiónn</Text>
            <View style={tw`px-6`}>
                {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : (
                    <>
                    <View style={tw``}>
                        <Text style={tw`text-gray-800 mb-1`}>Usuario:</Text>
                        <Controller
                            control={control}
                            rules={{
                            required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={tw`bg-white py-2 rounded px-4 shadow-sm`}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            )}
                            name="user"
                            defaultValue=""
                        />
                        {errors.user && <Text>This is required. </Text>}
                    </View>
                    <View style={tw`mt-4`}>
                        <Text style={tw`text-gray-800 mb-1`}>Contraseña:</Text>
                        <Controller
                            control={control}
                            rules={{
                            required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={tw`bg-white py-2 rounded px-4 shadow-sm`}
                                onBlur={onBlur}
                                keyboardType="default"
                                textContentType="password"
                                onChangeText={onChange}
                                value={value}
                            />
                            )}
                            name="password"
                            defaultValue=""
                        />
                    </View>
                    </>
                )}
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={tw`bg-blue-600 rounded-full py-3 mt-6 shadow-xl`}>
                    <Text style={tw`text-white text-base text-center`}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        paddingHorizontal: 20
        // alignItems: 'center'
    },
    label: {
        fontSize: 16,
        marginBottom: 6
    },
    send: {
        height: 54,
        backgroundColor: '#f2f2f2'
    },
    item: {

    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "blue",
        marginTop: 25,
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      appButtonText: {
        fontSize: 16,
        color: "#fff",
        alignSelf: "center",
        textTransform: "uppercase"
    },    
    input: {
      backgroundColor: "#ffffff",
      borderRadius: 5,
      paddingLeft: 14
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        fontWeight: "bold",
        marginVertical: 45
    },
    header: {
      fontSize: 20
    },
    nav: {
      flexDirection: "row",
      justifyContent: "space-around"
    },
    navItem: {
      flex: 1,
      alignItems: "center",
      padding: 10
    },
    subNavItem: {
      padding: 5
    },
    topic: {
      textAlign: "center",
      fontSize: 15
    }
});

export default Login