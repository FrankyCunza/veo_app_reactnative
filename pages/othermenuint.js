import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native'
import tw from 'tailwind-react-native-classnames';
const othermenuint = ({ route, navigation}) => {
    const {term, buttons, form} = route.params
    const [data, setData] = useState([]); 
    useEffect(() => {
        setData(buttons)
        // alert(JSON.stringify(buttons))
    }, [])
    const goPage = (name,form) => {
        // routerLink
        navigation.navigate(name, {
            term: name,
            form: form
        })
        // alert(JSON.stringify(item))
    }

    return (
        <View>
            <Text>{term}</Text>
            {data.map((item,index)=>{
                return (
                    <TouchableHighlight key={"menuint"+index} onPress={() => {goPage('/other-menus-form',form)}} style={[tw``, {}]}>  
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableHighlight>   
                )
            })}
        </View>
    )
}

export default othermenuint

const styles = StyleSheet.create({})
