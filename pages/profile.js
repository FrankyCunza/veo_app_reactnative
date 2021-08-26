import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Title from '../components/title'
import { useForm, Controller, set } from "react-hook-form"
import tw from 'tailwind-react-native-classnames'
import RNPickerSelect from 'react-native-picker-select'

const Profile = () => {
    const { control, register, handleSubmit, setValue,formState: { errors } } = useForm();
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
                    setData(json.data)
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
                    setValues(json.data.data)
                    setLoading(false)
                    for (const [key, value] of Object.entries(json.data.data)) {
                        // console.log(key, value);
                        if (JSON.stringify(value).startsWith("{") && JSON.stringify(value).endsWith("}")) {
                            // alert
                        } else {
                            setValue(key, value||'');
                        }
                    }
                    // alert(JSON.stringify(json.data.data))
                })
                .catch((error) => {
                    alert(error)
            });
          } catch(e) {
            alert(e)
        }
    }

    const onSubmit = async(form) => {
        form['document'] = {
            "type_document": "DNI",
            "document": "99999716"
        }
        // alert(JSON.stringify(form))
        // return false
        try {
            // Collect Data
            let data = {
                "data":{
                    "title": "Perfil",
                    "code": "SD2005",
                    "version": "4.00",
                    "health_staff": false,
                    "data": form
                }
            }

            // alert(JSON.stringify(data))
            // return false
            
            const token = await AsyncStorage.getItem('token')
            const id = await AsyncStorage.getItem('id')
            fetch('https://gateway.vim365.com/users/saveprofile', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'security-header': 'Vim365Aputek/2020.04',
                    Authorization: token,
                    id: id
                }
                })
                .then((response) => response.json())
                .then((json) => {
                    alert(JSON.stringify(json))
                })
                .catch((error) => {
                    alert('Error Save Form', error)
            });
          } catch(e) {
            alert('Error Save Form', e)
        }
    }

    return (
        <ScrollView>
            <Title title="Perfil Personal" />
            {isLoading ? <ActivityIndicator size="small" color="#0000ff" style={tw`py-8`} /> :
            
                <View style={tw`px-4`}>
                    {data.map((item, index) => {
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
                        || item.form_type == 'work_job' 
                        || item.form_type == 'work_area' 
                        || item.form_type == 'work_name' 
                        || item.form_type == 'work_address' 
                        ) {
                            return (
                                <View style={tw`mt-2`} key={'form'+index}>
                                    <Text style={tw`text-gray-800 mb-1 text-base`}>{item.title}</Text>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: false,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={tw`bg-white py-3 rounded px-4 shadow-sm`}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            defaultValue={values ? values[item.name] : ''}
                                            value={value}
                                        />
                                        )}
                                        name={item.name}
                                        // defaultValue=""
                                    />
                                </View>
                            )
                        } else if (item.type == 'title') {
                            return (
                                <View style={tw`mt-2`} key={'form'+index}>
                                    <Text style={tw`text-gray-800 text-2xl font-bold`}>{item.title}</Text>
                                </View>
                            )
                        } else if (item.form_type == 'number') {
                            return (
                                <View style={tw`mt-2`} key={'form'+index}>
                                    <Text style={tw`text-gray-800 mb-1 text-base`}>{item.title}</Text>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: false,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={tw`bg-white py-3 rounded px-4 shadow-sm`}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            defaultValue={values ? values[item.name] : ''}
                                            value={value}
                                        />
                                        )}
                                        name={item.name}
                                        // defaultValue=""
                                    />
                                </View>
                            )
                        } else if (item.form_type == 'select') {
                            return (
                                <View key={item.name} style={tw`mt-2`}>
                                    <Text style={tw`text-gray-800 mb-1 text-base`}>{item.title}</Text>
                                    <View style={tw`bg-white`}>
                                        <RNPickerSelect
                                            style={tw`bg-white`}
                                            value={values ? values[item.name] : ''}
                                            onValueChange={(value) => setValue(item.name, value)}
                                            items={item.data}
                                        />
                                    </View>
                                </View>
                            )
                        } else {
                            return (
                                <View key={'form'+index}>
                                    <Text>{item.title}</Text>
                                </View>
                            )
                        }
                    })}
                </View>
            }
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={tw`bg-blue-600 py-2 rounded-full`}>
                <Text style={tw`text-center text-white text-xl`}>Enviar</Text>
            </TouchableOpacity>    
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({})
