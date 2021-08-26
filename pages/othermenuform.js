import React, { useState, useEffect } from 'react'
import { TextInput , StyleSheet, Text, View, TouchableHighlight } from 'react-native'

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
                            <TextInput 
                            style={styles.input}
                            placeholder={item.text}/>
                        </View>
                    </TouchableHighlight>   
                )
            })}
        </View>
    )
}

export default othermenuform

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 12
    }
})
