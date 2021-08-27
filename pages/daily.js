import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, useWindowDimensions, TouchableHighlight, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import DailyTraffic from '../components/daily_traffic';
import tw from 'tailwind-react-native-classnames';
import Title from '../components/title';
import { HHMMSS, dateYYYYMMDD } from '../utils/utils';

const Daily = ( { navigation } ) => {
    const [cards, setCards] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [isLoadingTraffic, setLoadingTraffic] = useState(true);
    const [collectData, setCollectData] = useState([])
    const [resultTraffic, setResultTraffic] = useState('')
    const [values, setValues] = useState(0)
    const [range, setRange] = useState([]);
    const { width } = useWindowDimensions();

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
        let answers = []
        for (const [key, val] of Object.entries(collectData)) {
            answers.push({
              "code": parseInt(key),
              "response": collectData[key]['selected']  
            })
        }
        // alert(JSON.stringify(answers))
        // return false
        setLoading(true)
        try {
            // Data Storage
            const keys = await AsyncStorage.getAllKeys()
            const itemsArray = await AsyncStorage.multiGet(keys)
            let object = {}
            itemsArray.map(item => {
                if (item[0] == 'area_id' 
                    || item[0] == 'branch_id' 
                    || item[0] == 'company_id' 
                    || item[0] == 'document' 
                    || item[0] == 'end_point' 
                    || item[0] == 'full_name' 
                    || item[0] == 'job_id' 
                    || item[0] == 'worker_id' 
                ) {
                    object[`${item[0]}`] = item[1]
                }
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
                    "answers": answers
                },
                "date": dateYYYYMMDD(),
                "hour": HHMMSS(),
            }
            // alert(JSON.stringify(data))
            // return false
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
                    setLoadingTraffic(false)
                    // alert(JSON.stringify(traffic))
                })
                .catch((error) => {
                    alert('Error Save Form', error)
            });
          } catch(e) {
            alert('Error Save Form', e)
        }
    }

    getImage = (image) => {
        return 'https://scraprix.com/img/svgtopng/'+image+'.png'
    }

    const renderItem = ( { item } ) => {
        if (item.type == 'check') {
            return (
                <View style={[tw`bg-white w-5/12 rounded mt-4 h-28 shadow`, { width: '48%' }, collectData[item.code].selected ? tw`bg-blue-600` : '']}>
                    <TouchableHighlight style={[tw``, {}]} onPress={() => {alert("Hello")}}>
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
        } else if (item.type == 'question') {
            return (
                <View style={[tw`bg-white w-full rounded mt-4 h-28 shadow`, { width: '48%' }, collectData[item.code].selected ? tw`bg-blue-600` : '']}>
                    <TouchableHighlight style={[tw``, {}]} onPress={() => {alert("Hello")}}>
                        <View style={tw`h-full justify-center items-center`}>
                            <Image style={{width: 45, height: 45, resizeMode: 'contain'}} source={{uri: "https://image.flaticon.com/icons/png/512/1021/1021606.png"}} />
                            <Text style={[tw`text-center px-2 text-sm leading-4 mt-2`, collectData[item.code].selected ? tw`text-white` : tw`text-gray-800`]}>{item.title}</Text>
                            <CheckBox
                                disabled={false}
                                style={styles.checkbox}
                                value={collectData[item.code].selected}
                                onValueChange={(newValue) => { setCollectData({...collectData, [item.code]: {...item, selected: newValue}}), changeCheck(newValue, item.id, item.value, item.image) }}
                            />
                        </View>
                    </TouchableHighlight>
                </View>
            )
        } else {}
    }

    return (
        <SafeAreaView style={[tw`bg-white`, {flex: 1}]}>
            <ScrollView>
                <Title title="Declaración diaria" navigation={navigation} />
                {/* {isLoading  ? isLoadingTraffic==false ? <></> : <ActivityIndicator style={tw`py-12`} size="small" color="#0000ff" /> :
                    (
                    <FlatList data={cards} numColumns={2} style={tw`-mt-4`} renderItem={renderItem} columnWrapperStyle={{justifyContent: 'space-between', paddingHorizontal: 14}} keyExtractor={((item, i) => item.title)} 
                    ListFooterComponent={<View style={tw`px-4 mt-4 pb-4`}>
                        <TouchableOpacity onPress={senData} style={tw`bg-blue-600 py-2 rounded-full`}>
                            <Text style={tw`text-center text-white text-xl`}>Enviar</Text>
                        </TouchableOpacity>
                    </View>} />
                    )
                } */}
                <View style={[tw`pb-4`, {flex: 1, flexDirection: 'row', flexWrap:'wrap' ,width: width, backgroundColor: 'transparent', marginTop: -14, justifyContent: 'space-between', paddingHorizontal: 14}]}>
                    {isLoading  ? isLoadingTraffic==false ? <></> : <ActivityIndicator style={tw`py-12`} size="small" color="#0000ff" /> :
                        (
                            <>
                            {cards.map((item, index) => {
                                if (item.type == 'check') {
                                    return (
                                        <View style={[tw`bg-gray-100 rounded mt-4 h-36`, { width: width/2-21 }, collectData[item.code].selected ? tw`bg-blue-600` : '']} key={item.code}>
                                            <TouchableHighlight style={[tw``, {}]} onPress={() => {}}>
                                                <View style={tw`h-full justify-center items-center`}>
                                                    <Image style={{width: 45, height: 45, resizeMode: 'contain'}} source={{uri: getImage(item.image)}} />
                                                    <Text style={[tw`text-center px-2 text-base leading-5 mt-3`, collectData[item.code].selected ? tw`text-white` : tw`text-gray-800`]}>{item.title}</Text>
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
                                } else if (item.type == 'question') {
                                    return (
                                        <View style={[tw`bg-gray-100 rounded mt-4 pb-4`, { width: width, height: 'auto'}]} key={item.code}>
                                            <Text style={[tw`text-left p-4 text-base leading-5 text-gray-800`]}>{item.text}</Text>
                                            <View style={tw`px-4 flex-row items-center justify-center`}>
                                                <View style={[tw`rounded-full p-1 w-4/12`, collectData[item.code].selected==false ? tw`bg-blue-600` : tw`bg-gray-100`]}>
                                                    <TouchableHighlight style={[tw``, {}]} onPress={() => {}}>
                                                        <View style={[tw`justify-center items-center`, {flexWrap: 'wrap', flexDirection: 'row'}]}>
                                                            <Text style={[tw`text-center px-2 text-sm leading-4`, collectData[item.code].selected ? tw`text-white` : tw`text-gray-800`]}>No</Text>
                                                            <CheckBox
                                                                disabled={false}
                                                                value={collectData[item.code].selected==false}
                                                                onValueChange={(newValue) => { setCollectData({...collectData, [item.code]: {...item, selected: false}}, changeCheck(newValue, item.id, item.value, item.image) ) }}
                                                            />
                                                        </View>
                                                    </TouchableHighlight>
                                                </View>
                                                <View style={[tw`rounded-full p-1 w-4/12 ml-4`, collectData[item.code].selected==true ? tw`bg-blue-600` : tw`bg-gray-100`]}>
                                                    <TouchableHighlight style={[tw``, {}]} onPress={() => {}}>
                                                        <View style={[tw`justify-center items-center`, {flexWrap: 'wrap', flexDirection: 'row'}]}>
                                                            <Text style={[tw`text-center px-2 text-sm leading-4`, collectData[item.code].selected ? tw`text-white` : tw`text-gray-800`]}>Si</Text>
                                                            <CheckBox
                                                                disabled={false}
                                                                value={collectData[item.code].selected==true}
                                                                onValueChange={(newValue) => { setCollectData({...collectData, [item.code]: {...item, selected: true}}, changeCheck(newValue, item.id, item.value, item.image) ) }}
                                                            />
                                                        </View>
                                                    </TouchableHighlight>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                } else {}
                            })}
                            <View style={tw`w-full mt-4`}>
                                <TouchableOpacity onPress={senData} style={tw`bg-blue-600 py-3 rounded-full`}>
                                    <Text style={tw`text-center text-white text-xl`}>Enviar</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                        )
                    }
                </View>
                {isLoadingTraffic ? <></> : (<DailyTraffic name={resultTraffic} />)}
            </ScrollView>
        </SafeAreaView>
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