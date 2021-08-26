import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'tailwind-react-native-classnames';

const othermenus = ( { route, navigation} ) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const id = await AsyncStorage.getItem('id')
            const company_id = await AsyncStorage.getItem('company_id')
            const end_point = await AsyncStorage.getItem('end_point')
            fetch(`https://gateway.vim365.com/auxiliary-control/get-auxiliary-control?company_id=${company_id}&end_point=${end_point}`, {
                headers: {
                    'security-header': 'Vim365Aputek/2020.04',
                    Authorization: token,
                    id: id
                }
            })
            .then((response) => response.json())
            .then((json) => {
                // alert(JSON.stringify(json))
                setData(json)
                setLoading(false)
            })
            .catch((error) => {
                alert("Error: 1", error)
            });
        } catch(e) {
            alert("Error: 2", e)
        }
    }

    const goPage = (name,item) => {
        // routerLink
        navigation.navigate(name, {
            term: name,
            buttons: item.template.buttons,
            form: item.template.form
        })
        // alert(JSON.stringify(item))
    }

    return (
        <View>
            <Text>Hola a todos</Text>
            {isLoading?<></>:
                data.data.map((item,index) => {
                    return (
                        <TouchableHighlight key={"menu"+index} onPress={() => {goPage('/other-menus-int',item)}} style={[tw``, {}]}>
                            <View>
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableHighlight>    
                    )
                })
            }
        </View>
    )
}

export default othermenus

const styles = StyleSheet.create({})
