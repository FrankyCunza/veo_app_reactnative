import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, ActivityIndicator, TouchableHighlight, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements'
import Title from '../components/title';

const Informed = () => {
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
            fetch(`https://gateway.vim365.com/news/api/v1.0/get-news?company_id=${company_id}&end_point=${end_point}`, {
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

    const goPage = (item) => {
        // routerLink
        navigation.navigate('/sliderprotocols', {
            title: item.name,
            data: item
        })
    }

    const renderItem = ( { item } ) => {
        return (
            <View style={[tw`mt-3 px-4 relative`]}>
                <TouchableHighlight style={[tw`relative`, {}]} onPress={() => {goPage(item)}}>
                    <View style={tw`bg-white px-4 py-6 shadow rounded`}>
                        <Text style={tw`text-lg`}>{item.name}</Text>
                        <View style={tw`absolute top-5 right-2 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center`}>
                            <Icon style={tw``} name="arrowright" color="black" type="antdesign" />
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    return (
        <View>
            <Title title="Informed" />
            {isLoading  ? <ActivityIndicator style={tw`py-12`} size="small" color="#0000ff" /> :
                (
                    <FlatList data={data.data} style={tw`pb-4 -mt-4`} renderItem={renderItem} keyExtractor={((item, i) => item.name)} />
                )
            }
        </View>
    )
}

export default Informed