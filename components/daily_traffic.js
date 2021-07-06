import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import VectorImage from 'react-native-vector-image';

const DailyTraffic = ({ name }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        getData()
        // alert(name)
    }, [name])

    

    const getData = async () => {
        try {
            if (name) {
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
                            alert(JSON.stringify(json.data[0]['traffic_green']))
                        } else if (name == 'yellow') {
                            setData(json.data['traffic_yellow'])
                            alert(JSON.stringify(json.data[0]['traffic_yellow']))
                        } else {
                            setData(json.data[0]['traffic_red'])
                            alert(JSON.stringify(json.data[0]['traffic_red']))
                        }
                    })
                    .catch((error) => {
                        alert(error)
                });
            } else {
                alert("Sin Traffin")
            }
          } catch(e) {
            alert(e)
        }
    }

    const senData = () => {

    }

    const test = () => {
        return './../assets/svgs/td15.svg'
    }

    const renderItem = ({item}) => {
        return (
            <View>
                <View style={{ paddingVertical: 14, paddingHorizontal: 16}}>
                    <VectorImage source={require('./../assets/svgs/td15.svg')} />
                    <Text style={{fontSize: 14, textAlign: 'center'}}>{item.name}</Text>
                </View>
            </View>
        )
    }

    return (
        <View>
            {data ? (
            <View>
                <Text>{data.title}</Text>
                <FlatList data={data.recomendations} numColumns={1} renderItem={renderItem} keyExtractor={((item, i) => i)} />
            </View>
            ) : ''}
        </View>
    )
}

export default DailyTraffic