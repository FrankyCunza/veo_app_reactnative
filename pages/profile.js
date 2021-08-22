import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Title from '../components/title'
import { useForm, Controller, set } from "react-hook-form"
import tw from 'tailwind-react-native-classnames'

const Profile = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const id = await AsyncStorage.getItem('id')
            const company_id = await AsyncStorage.getItem('company_id')
            const end_point = await AsyncStorage.getItem('end_point')
            fetch(`https://gateway.vim365.com/checkcards/cards?company_id=${company_id}&end_point=${end_point}&page=profileFormReactive`, {
                headers: {
                    'Content-Type': 'application/json',
                    'security-header': 'Vim365Aputek/2020.04',
                    Authorization: token,
                    id: id
                }
                })
                .then((response) => response.json())
                .then((json) => {
                    setData(json)
                    setLoading(false)
                    alert(JSON.stringify(json))
                })
                .catch((error) => {
                    alert(error)
            });
          } catch(e) {
            alert(e)
        }
    }

    return (
        <View>
            <Title title="Perfil Personal" />
            <View style={tw`px-4`}>
                {data.data ? data.data.map((item, index) => {
                    return (
                        <View key={'form'+index}>
                            <Text>{item.title}</Text>
                        </View>
                    )
                }) : <></>}
                <View style={tw``}>
                    <Text style={tw`text-gray-800 mb-1 text-lg`}>Usuario:</Text>
                    <Controller
                        control={control}
                        rules={{
                        required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={tw`bg-white py-3 rounded px-4 shadow-sm`}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        )}
                        name="user"
                        defaultValue=""
                    />
                </View>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})
