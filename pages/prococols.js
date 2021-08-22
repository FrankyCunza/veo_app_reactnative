import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableHighlight, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Protocols = () => {
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
            fetch(`https://gateway.vim365.com/cardslides/slides?company_id=${company_id}&end_point=${end_point}&page=protocols`, {
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
                    // alert(JSON.stringify(json))
                })
                .catch((error) => {
                    alert(error)
            });
          } catch(e) {
            alert(e)
        }
    }
    const renderItem = ( { item } ) => {
        return (
            <View style={tw`mt-2 px-4`}>
                <TouchableHighlight style={[tw``, {}]} onPress={() => {alert("Hello")}}>
                    <View style={tw`bg-white p-4 shadow rounded`}>
                        <Text>{item.name}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
    return (
        <View>
            <Text>Protocols</Text>
            {/* {data.data ? (data.data.map((el, index) => {
                return (
                    <View>
                        <Text>Hello</Text>
                    </View>
                )
            })) : (<></>)} */}
            {isLoading  ? <ActivityIndicator style={tw`py-12`} size="small" color="#0000ff" /> :
                (
                    <FlatList data={data.data} style={tw`pb-4`} renderItem={renderItem} keyExtractor={((item, i) => item.name)} />
                )
            }
        </View>
    )
}

export default Protocols