import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import DailyTraffic from '../components/daily_traffic';
import tw from 'tailwind-react-native-classnames';

const Daily = ({navigation}) => {
    const [cards, setCards] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [collectData, setCollectData] = useState([])
    const [resultTraffic, setResultTraffic] = useState('')
    const [values, setValues] = useState(0)
    const [range, setRange] = useState([]);
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const id = await AsyncStorage.getItem('id')
            const company_id = await AsyncStorage.getItem('company_id')
            const end_point = await AsyncStorage.getItem('end_point')
            fetch(`https://gateway.vim365.com/checkcards/cards?company_id=${company_id}&end_point=${end_point}&page=daily-test`, {
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
                    setRange(json.range)
                    setLoading(false)
                    let res = {}
                    for (let item of json.data) {
                        res[item.code] = item
                    }
                    setCollectData(res)
                    setCards(json.data)
                    // for (const item of json.data) {
                    //     setBoxes((s) => [...s, {"code": item.code, "id": item.id, "response": false, "image": item.image, "type": item.type, "title": item.text}])
                    // }
                })
                .catch((error) => {
                    alert(error)
            });
          } catch(e) {
            alert(e)
        }
    }

    const changeCheck = (check, id, value, icon) => {
        // alert(icon)
        // alert(JSON.stringify(range))
        if (check == true) {
            setValues(values+value)
        } else {
            setValues(values-value)
        }
    }

    const senData =  async () => {
        // alert(JSON.stringify(collectData))
        setLoading(true)
        try {
            // Data Storage
            const keys = await AsyncStorage.getAllKeys()
            const itemsArray = await AsyncStorage.multiGet(keys)
            let object = {}
            itemsArray.map(item => {
                object[`${item[0]}`] = item[1]
            })
            
            // Traffic
            let traffic = ''
            if (values === range['min_low_range'] || values <= range['max_low_range']) {
                traffic = 'green'
            } else if (values === range['min_med_range'] || values <= range['max_med_range']) {
                traffic = 'yellow'
            } else if (values === range['min_hig_range'] || values <= range['max_hig_range']) {
                traffic = 'red'
            } else {}
            
            // Collect Data
            let data = {
                ...object,
                "form": {
                    "code": "DT2005",
                    "traffic": traffic,
                    "status": true,
                    "version": 4.00,
                    "answers": []
                },
                "date": '06-07-2021',
                "hour": '00:00:00',
            }
            const token = await AsyncStorage.getItem('token')
            const id = await AsyncStorage.getItem('id')
            fetch('https://gateway.vim365.com/saveform/saveform', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'security-header': 'Vim365Aputek/2020.04',
                    Authorization: token,
                    id: id
                }
                })
                .then((response) => response.json())
                .then((json) => {
                    setResultTraffic(traffic)
                    // alert(JSON.stringify(traffic))
                })
                .catch((error) => {
                    alert(error)
            });
          } catch(e) {
            alert(e)
        }
    }

    const renderItem = ({item}) => {
        return (
            <View style={[tw`bg-white w-5/12 rounded mt-4 h-28 shadow`, { width: '48%' }, collectData[item.code].selected ? tw`bg-blue-600` : '']}>
                <TouchableHighlight style={[tw``, {}]}>
                    <View style={tw`h-full justify-center items-center`}>
                        <Image style={{width: 45, height: 45, resizeMode: 'contain'}} source={{uri: "https://image.flaticon.com/icons/png/512/1021/1021606.png"}} />
                        <Text style={[tw`text-center px-2 text-sm leading-4 mt-2`, collectData[item.code].selected ? tw`text-white` : tw`text-gray-800`]}>{item.title}</Text>
                        <CheckBox
                            disabled={false}
                            style={styles.checkbox}
                            value={collectData[item.code].selected}
                            onValueChange={(newValue) => { setCollectData({...collectData, [item.code]: {...item, selected: newValue}}, changeCheck(newValue, item.id, item.value, item.image) ) }}
                        />
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    return (
        <ScrollView style={tw`bg-gray-200 h-full`}>
            <DailyTraffic name={resultTraffic} />
            {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> :
                (<FlatList data={cards} numColumns={2} renderItem={renderItem} columnWrapperStyle={{justifyContent: 'space-between', paddingHorizontal: 14}} keyExtractor={((item, i) => item.title)} />)
            }
            <View style={tw`px-4 mt-4 pb-4`}>
                <TouchableOpacity onPress={senData} style={tw`bg-blue-600 py-2 rounded-full`}>
                    <Text style={tw`text-center text-white text-xl`}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    checked: {
        backgroundColor: 'red'
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    checkbox: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'red',
        opacity: 0
    },
    card: {
        backgroundColor: 'red',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 15,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        width: '48%',
        backgroundColor: 'white', 
        borderRadius: 4, 
        marginTop: 13,
        overflow: 'hidden', 
        shadowColor: '#000', 
        shadowOffset: {width: 0, height: 2}, 
        shadowOpacity: 1, 
        shadowRadius: 2,
        position: 'relative',
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }, 
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 12
    }
})

export default Daily