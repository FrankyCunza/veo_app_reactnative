import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, ActivityIndicator, TouchableHighlight, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements'
import Title from '../components/title';

const Protocols = ( { navigation } ) => {
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

    const goPage = (item) => {
        // routerLink
        navigation.navigate('/sliderprotocols', {
            title: item.name,
            data: item
        })
    }

    const getImage = (image) => {
        if (image.includes('/static/img')) {
            // alert(JSON.stringify('https://scraprix.com/img/svgtopng/'+image.split('../assets/svgs/')[1]))
            return 'https://scraprix.com/img/svgtopng/'+image.split('/static/img/protocols/')[1].replace(".svg", ".png")
        }
    }
    
    const renderItem = ( { item } ) => {
        return (
            <View style={[tw``, {width: '100%'}]} key={item.name}>
                <TouchableHighlight onPress={() => {goPage(item)}} style={[tw`bg-gray-100 rounded-xl mt-4 h-16 p-3`, {}]}>
                    <View style={[tw`h-full items-center`, {display: 'flex', flexWrap: 'nowrap', flexDirection: 'row'}]}>
                        <View style={tw`bg-white rounded p-2`}>
                            <Image style={{width: 30, height: 30, resizeMode: 'contain'}} source={{uri: getImage(item.icon)}} />
                        </View>
                        <Text style={tw`text-gray-800 text-center px-2 text-sm leading-4`}>{item.name}</Text>
                        <View style={tw`absolute top-1 right-1 w-8 h-8 bg-white rounded flex items-center justify-center`}>
                            <Icon style={tw``} name="arrowright" color="black" type="antdesign" size={14} />
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    return (
        <View style={tw`bg-white h-full`}>
            <Title title="Protocolos" navigation={navigation} />
            {/* {data.data ? (data.data.map((el, index) => {
                return (
                    <View>
                        <Text>Hello</Text>
                    </View>
                )
            })) : (<></>)} */}
            {isLoading  ? <ActivityIndicator style={tw`py-12`} size="small" color="#0000ff" /> :
                (
                    <FlatList data={data.data} style={tw`pb-4 -mt-4 px-4`} renderItem={renderItem} keyExtractor={((item, i) => item.name)} />
                )
            }
        </View>
    )
}

export default Protocols