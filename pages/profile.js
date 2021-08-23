import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Title from '../components/title'
import { useForm, Controller, set } from "react-hook-form"
import tw from 'tailwind-react-native-classnames'

const Profile = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState([])
    const [values, setValues] = useState({})
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
                    getValues()
                    // alert(JSON.stringify(json))
                })
                .catch((error) => {
                    alert(error)
            });
          } catch(e) {
            alert(e)
        }
    }

    const getValues = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const id = await AsyncStorage.getItem('id')
            fetch(`https://gateway.vim365.com/users/getprofile`, {
                headers: {
                    'Content-Type': 'application/json',
                    'security-header': 'Vim365Aputek/2020.04',
                    Authorization: token,
                    id: id
                }
                })
                .then((response) => response.json())
                .then((json) => {
                    setValues(json)
                    // setLoading(false)
                    // alert(JSON.stringify(json))
                })
                .catch((error) => {
                    alert(error)
            });
          } catch(e) {
            alert(e)
        }
    }

    return (
        <ScrollView>
            <Title title="Perfil Personal" />
            <View style={tw`px-4`}>
                {data.data ? data.data.map((item, index) => {
                    if (item.form_type == 'text' 
                    || item.form_type == 'title' 
                    || item.form_type == 'work_job' 
                    || item.form_type == 'work_area' 
                    || item.form_type == 'work_name' 
                    || item.form_type == 'work_address' 
                    || item.form_type == 'work_area' 
                    || item.form_type == 'full_name' 
                    || item.form_type == 'paternal_surname' 
                    || item.form_type == 'maternal_surname' 
                    || item.form_type == 'birth_day' 
                    || item.form_type == 'cell_phone' 
                    || item.form_type == 'email' 
                    || item.form_type == 'address' 
                    || item.type == 'address' 
                    || item.type == 'title' 
                    || item.form_type == 'work_job' 
                    || item.form_type == 'work_area' 
                    || item.form_type == 'work_name' 
                    || item.form_type == 'work_address' 
                    ) {
                        return (
                            <View style={tw`mt-2`} key={'form'+index}>
                                <Text style={tw`text-gray-800 mb-1 text-lg`}>{item.title}</Text>
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
                                        // defaultValue={values.data ? values.data.data.province : ''}
                                        value={value}
                                    />
                                    )}
                                    // name="user"
                                    // defaultValue="String"
                                />
                            </View>
                        )
                    } else {
                        return (
                            <View key={'form'+index}>
                                <Text>{item.title}</Text>
                            </View>
                        )
                    }
                }) : <></>}
            </View>
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({})
