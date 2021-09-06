import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator, TouchableOpacity, useWindowDimensions, TouchableHighlight, Image, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Title from '../components/title'
import { useForm, Controller, set } from "react-hook-form"
import tw from 'tailwind-react-native-classnames'
import CheckBox from '@react-native-community/checkbox';
import RNPickerSelect from 'react-native-picker-select'
import { Icon } from 'react-native-elements'

const Profile = ( { navigation } ) => {
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
            // alert(company_id)
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
                    getKeyValues = format
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
                    setLoading(false)
                    let getValues = {...getKeyValues} 
                    for (const [key, value] of Object.entries(getKeyValues)) {
                        if (key in json.data.form) {
                            getValues[key] = json.data.form[key]
                        }
                    }
                    setValues(getValues)
                    // alert(JSON.stringify(getValues))
                    // alert(JSON.stringify(json))
                })
                .catch((error) => {
                    alert(error)
            });
          } catch(e) {
            alert(e)
        }
    }

    const sendAlert = (title, text) =>
        Alert.alert(
            title,
            text,
            [
                { text: "OK", onPress: () => navigation.goBack() }
            ]
        );

    const onSubmit = async(form) => {
        // form['document'] = {
        //     "type_document": "DNI",
        //     "document": "99999716"
        // }
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
                    "form": values
                }
            }

            // alert(JSON.stringify(data))
            // return false
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
                    sendAlert('', json.message)
                })
                .catch((error) => {
                    alert('Error Save Form', error)
            });
          } catch(e) {
            alert('Error Save Form', e)
        }
    }

    return (
        <ScrollView style={tw`bg-white`}>
            <Title title="Perfil Personal" navigation={navigation} />
            {isLoading ? <ActivityIndicator size="small" color="#0000ff" style={tw`py-8`} /> :
            
                <View style={tw`px-4`}>
                    {data.map((item, index) => {
                        if (item.form_type == 'text' 
                        || item.form_type == 'number'
                        ) {
                            return (
                                <View style={tw`mt-3`} key={'form'+index}>
                                    <Text style={tw`text-gray-800 mb-1 text-base`}>{item.title}</Text>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: false,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={tw`bg-gray-100 border border-solid border-gray-300 py-3 rounded-xl px-4`}
                                            onBlur={onBlur}
                                            onChangeText={(newValue) => {onChange, setValues({...values, [item.name]: newValue})}}
                                            defaultValue={values ? values[item.name] : ''}
                                            value={value}
                                        />
                                        )}
                                        name={item.name}
                                        // defaultValue=""
                                    />
                                </View>
                            )
                        } else if (item.form_type == 'title') {
                            return (
                                <View style={tw`mt-2`} key={'form'+index}>
                                    <Text style={tw`text-gray-800 text-2xl font-bold`}>{item.title}</Text>
                                </View>
                            )
                        } else if (item.form_type == 'select') {
                            return (
                                <View key={item.name} style={tw`mt-2`}>
                                    <Text style={tw`text-gray-800 mb-1 text-base`}>{item.title}</Text>
                                    <View style={tw`bg-gray-100 border border-solid border-gray-300 rounded-xl px-4`}>
                                        <RNPickerSelect
                                            style={tw`bg-white`}
                                            value={values ? values[item.name] : ''}
                                            onValueChange={(value) => setValue(item.name, value)}
                                            items={item.loop}
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
                                                <View style={[tw`rounded-xl mt-4 h-36`, values[item.name] ? values[item.name][el.id] ? tw`bg-blue-600` : tw`bg-gray-100` : tw`bg-gray-100`, { width: width/2-21}]} key={'box'+i}>
                                                    <TouchableHighlight style={[tw``, {}]} onPress={() => {}}>
                                                        <View style={tw`h-full justify-center items-center`}>
                                                            <Image style={{width: 45, height: 45, resizeMode: 'contain'}} source={{uri: "https://image.flaticon.com/icons/png/512/1021/1021606.png"}} />
                                                            <Text style={[tw`text-center px-2 text-base leading-5 mt-3`, values[item.name] ? values[item.name][el.id] ? tw`text-white` : tw`text-gray-800` : '', ]}>{el.name}</Text>
                                                            <CheckBox
                                                                disabled={false}
                                                                style={tw`bg-red-500 absolute w-full h-full opacity-0`}
                                                                // style={styles.checkbox}
                                                                value={values[item.name] ? values[item.name][el.id] : false}
                                                                onValueChange={(newValue) => {values[item.name] ? setValues({...values, [item.name]: {...values[item.name], [el.id]: newValue}}) : setValues({...values, [item.name]: {...values[item.name], [el.id]: newValue}})}}
                                                            />
                                                            {values[item.name] ? values[item.name][el.id] && <View style={tw`absolute top-1 right-1 w-8 h-8 bg-transparent rounded flex items-center justify-center`}>
                                                                <Icon style={tw``} name="checkcircle" color="white" type="antdesign" size={17} />
                                                            </View> : <></>}
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
                    <View style={tw`px-4 pb-4`}>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={tw`bg-blue-600 py-3 rounded-full mt-4`}>
                            <Text style={tw`text-center text-white text-xl`}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({})
