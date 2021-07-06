import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller, set } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setLoading] = useState(false)

    const storeData = async (value) => {
        try {
            for (const [key, val] of Object.entries(value)) {
                await AsyncStorage.setItem(key, val ? val : 'false')
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
                navigation.navigate('Home', {})
            })
            .catch((error) => {
              console.error(error);
            });
        } catch(e) {
            console.log(e)
        }
        
    };

    return (
        <View style={{paddingHorizontal: 12}}>
            <Text style={styles.title}>Iniciar sesión</Text>
            
            <View>
                {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : (
                    <>
                    <View style={styles.item}>
                        <Text style={styles.label}>Usuario:</Text>
                        <Controller
                            control={control}
                            rules={{
                            required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
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
                    <View style={styles.item, {marginTop: 14}}>
                        <Text style={styles.label}>Contraseña:</Text>
                        <Controller
                            control={control}
                            rules={{
                            required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
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
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
        backgroundColor: "#009688",
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
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
        marginVertical: 14
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