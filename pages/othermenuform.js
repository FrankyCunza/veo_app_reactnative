import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

const othermenuform = ({ route, navigation}) => {
    const {term, form}=route.params
    const [forms, setForms] = useState([]); 
    useEffect(() => {
        setForms(form)
        // alert(JSON.stringify(icon))
        alert(JSON.stringify(form))
    }, [])
    return (
        <View>
            <Text>Hola</Text>
            {forms.map((item,index)=>{
                return (
                    <TouchableHighlight key={"menuform"+index}>  
                        <View>
                            <Text>{item.text}</Text>
                        </View>
                    </TouchableHighlight>   
                )
            })}
        </View>
    )
}

export default othermenuform

const styles = StyleSheet.create({})
