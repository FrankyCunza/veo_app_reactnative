import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableHighlight, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import tw from 'tailwind-react-native-classnames';

const DailyTraffic = ({ name }) => {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(false)
        if (name) {
            getData()
        }
    }, [name])

    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const id = await AsyncStorage.getItem('id')
            const company_id = await AsyncStorage.getItem('company_id')
            const end_point = await AsyncStorage.getItem('end_point')
            fetch(`https://gateway.vim365.com/checkcards/cards?company_id=${company_id}&end_point=${end_point}&page=traffic-daily-test`, {
                headers: {
                    'Content-Type': 'application/json',
                    'security-header': 'Vim365Aputek/2020.04',
                    Authorization: token,
                    id: id
                }
                })
                .then((response) => response.json())
                .then((json) => {
                    // alert(JSON.stringify(json))
                    if (name == 'green') {
                        setData(json.data[0]['traffic_green'])
                    } else if (name == 'yellow') {
                        setData(json.data[0]['traffic_yellow'])
                    } else {
                        setData(json.data[0]['traffic_red'])
                    }
                    setLoading(false)
                })
                .catch((error) => {
                    alert(error)
            });
          } catch(e) {
            alert(e)
        }
    }

    const getImage = (image) => {
        return 'https://scraprix.com/img/svgtopng/'+image+'.png'
    }

    return (
        <View style={tw`px-4 bg-gray-100 pt-6`}>
            {name.length > 0 ? isLoading ? <ActivityIndicator style={tw`py-12`} size="small" color="#0000ff" /> :
               <View style={tw``}>
                    <View style={tw`items-center`}>
                        <View style={tw`rounded-full w-24 h-24 bg-white shadow-md items-center justify-center`}>
                            <Image style={{width: 45, height: 45, resizeMode: 'contain'}} source={{uri: getImage(data.icon)}} />
                        </View>
                        <Text style={tw`text-4xl py-4 font-bold text-gray-800 text-center`}>{data?.title}</Text>
                        <Text style={tw`text-gray-800 text-lg leading-6 text-center mt-1 mb-4`}>{data?.description}</Text>
                    </View>
                    <View style={tw`pb-6 rounded`}>
                        {data.recomendations ? data?.recomendations.map((item, index) => {
                            return (
                            <View style={[tw`bg-white rounded-xl p-5 mt-4 shadow-sm`, { width: '100%' }]} key={'traffic'+index}>
                                <Image style={{width: 45, height: 45, resizeMode: 'contain'}} source={{uri: getImage(item.icon)}} />
                                <Text style={tw`text-base leading-5 mt-4 text-gray-800`}>{ item.name }</Text>
                            </View>
                            )
                        }) : <></>}
                    </View>
               </View>
            : (<></>)}
        </View>
    )
}

export default DailyTraffic

{/* <FlatList data={cards} numColumns={2} renderItem={renderItem} columnWrapperStyle={{justifyContent: 'space-between', paddingHorizontal: 14}} keyExtractor={((item, i) => item.title)} /> */}