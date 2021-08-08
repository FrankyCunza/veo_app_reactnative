import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
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
                // alert(JSON.stringify(json))
                navigation.navigate('Home', {})
            })
            .catch((error) => {
                alert(error)
            });
        } catch(e) {
            alert(e)
        }
        
    };

    return (
        <View style={tw`flex h-full px-6 bg-gray-200 justify-center`}>
            <Text style={tw`text-gray-800 text-3xl font-bold text-center mb-4`}>Iniciar sesión</Text>
            <View>
                {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : (
                    <>
                    <View style={tw``}>
                        <Text style={tw`text-gray-900 mb-1`}>Usuario:</Text>
                        <Controller
                            control={control}
                            rules={{
                            required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={tw`bg-white py-2 rounded px-4`}
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
                        <Text style={tw`text-gray-900 mb-1`}>Contraseña:</Text>
                        <Controller
                            control={control}
                            rules={{
                            required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={tw`bg-white py-2 rounded px-4`}
                                onBlur={onBlur}
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
            </View>
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={tw`bg-blue-600 rounded py-2 mt-6 shadow`}>
                <Text style={tw`text-white text-base text-center`}>Enviar</Text>
            </TouchableOpacity>
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