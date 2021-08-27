import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator, TouchableOpacity, useWindowDimensions, TouchableHighlight, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Title from '../components/title'
import { useForm, Controller, set } from "react-hook-form"
import tw from 'tailwind-react-native-classnames'
import CheckBox from '@react-native-community/checkbox';
import RNPickerSelect from 'react-native-picker-select'

const Profile = () => {
    const { control, register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [data, setData] = useState([])
    const [values, setValues] = useState({})
    const [isLoading, setLoading] = useState(true)
    const { width } = useWindowDimensions();

    useEffect(() => {
        getData()
    }, [])

    let getKeyValues = {}

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
                    let format = {}
                    for (let i=0; i<json.data.length; i++) {
                        if ('name' in json.data[i]) {
                            format[json.data[i].name] = ''
                            // alert(json.data[i].title)
                        } else {
                            // alert(json.data[i].title)
                        }
                    }
                    // setValues(format)
                    getKeyValues = format
                    // test = format
                    getValues()
                    // alert(JSON.stringify(values))
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
                    setLoading(false)
                    let getValues = {...getKeyValues} 
                    for (const [key, value] of Object.entries(getKeyValues)) {
                        if (key in json.data.data) {
                            getValues[key] = json.data.data[key]
                        }
                    }
                    setValues(getValues)
                    // alert(JSON.stringify(getValues))
                })
                .catch((error) => {
                    alert(error)
            });
          } catch(e) {
            alert(e)
        }
    }

    const onSubmit = async(form) => {
        alert(JSON.stringify(values))
        return false
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
                        } else if (item.form_type == 'checkboxes') {
                            return (
                                <View key={item.name} style={tw`mt-2`}>
                                    <Text style={tw`text-gray-800 mb-1 text-base text-xl font-bold`}>{item.title}</Text>
                                    <View style={{flex: 1, flexDirection: 'row', flexWrap:'wrap' ,width: width-30, backgroundColor: 'transparent', marginTop: -14, justifyContent: 'space-between', paddingHorizontal: 0}}>
                                        {item.loop.map((el, i) => {
                                            return (
                                                <View style={[tw`bg-white rounded mt-4 h-28 shadow`, { width: width/2-21}]} key={'box'+i}>
                                                    <TouchableHighlight style={[tw``, {}]} onPress={() => {}}>
                                                        <View style={tw`h-full justify-center items-center`}>
                                                            <Image style={{width: 45, height: 45, resizeMode: 'contain'}} source={{uri: "https://image.flaticon.com/icons/png/512/1021/1021606.png"}} />
                                                            <Text style={[tw`text-center px-2 text-sm leading-4 mt-2`]}>{el.name}</Text>
                                                            <CheckBox
                                                                disabled={false}
                                                                // style={styles.checkbox}
                                                                value={values[item.name] ? values[item.name][el.id] : false}
                                                                onValueChange={(newValue) => { }}
                                                            />
                                                        </View>
                                                    </TouchableHighlight>
                                                </View>
                                            )
                                        })}
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
