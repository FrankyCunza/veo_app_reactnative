import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";

const Login = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        alert(data)
        console.log(data)
    };

    return (
        <View style={{paddingHorizontal: 12}}>
            <Text style={styles.title}>Iniciar sesión</Text>
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
                    name="firstName"
                    defaultValue=""
                />
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
                    name="firstName"
                    defaultValue=""
                />
            </View>
            <TouchableOpacity onPress={onSubmit} style={styles.appButtonContainer}>
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