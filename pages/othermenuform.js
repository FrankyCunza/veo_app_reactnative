import React, { useState, useEffect } from 'react'
import { TextInput , StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import CheckBox from '@react-native-community/checkbox';

const othermenuform = ({ route, navigation}) => {
    const { term, form } = route.params
    const [ forms, setForms ] = useState([]);
    const [ values, setValues ] = useState({})
    useEffect(() => {
        setForms(form)
        let loop = {}
        for (let i=0; i<form.length; i++) {
            loop[i] = form[i]
        }
        setValues(loop)
    }, [])
    const senData =  async () => { 
        alert(JSON.stringify(values))
    }
    return (
        <ScrollView>
            <Text>Hola</Text>
            {forms.map((item,index)=>{
                if (item.type === 'number') {
                    return (
                        <TouchableHighlight key={"menuform"+index}>  
                            <View>
                                <Text>{item.text}</Text>
                                <TextInput 
                                style={styles.input}
                                onChangeText={(newValue) => {setValues({...values, [index]: {...item, "value": newValue}})}}
                                placeholder={item.text}/>
                            </View>
                        </TouchableHighlight>   
                    )
                } else if (item.type == 'title') {
                    return (
                        <View key={"menuform"+index}>
                            <Text style={tw`text-2xl text-gray-800 font-bold`}>{item.text}</Text>
                        </View>
                    )
                } else if (item.type == 'check') {
                    return (
                        <View style={[tw`bg-white w-full rounded mt-4 h-28 shadow`, { width: '48%' }]} key={"menuform"+index}>
                            <TouchableHighlight style={[tw``, {}]}>
                                <View style={tw`h-full justify-center items-center`}>
                                    <CheckBox
                                        disabled={false}
                                        // style={styles.checkbox}
                                        value={values[index].value}
                                        onValueChange={(newValue) => { setValues({...values, [index]: {...item, "value": newValue}}) }}
                                    />
                                </View>
                            </TouchableHighlight>
                        </View>
                    )
                }
            })}
            <View style={tw`w-full mt-4`}>
                <TouchableOpacity onPress={senData} style={tw`bg-blue-600 py-2 rounded-full`}>
                    <Text style={tw`text-center text-white text-xl`}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default othermenuform

const styles = StyleSheet.create({
    checkbox: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'red',
        opacity: 0
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 12
    }
})
