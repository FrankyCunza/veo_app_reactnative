import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

const Daily = ({navigation}) => {
    const [cards, setCards] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [checked, setChecked] = React.useState({});
    const [collectData, setCollectData] = useState([])
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
                    setLoading(false)
                    let pruebita = {}
                    for (let item of json.data) {
                        pruebita[item.code] = item
                    }
                    setCollectData(pruebita)
                    setCards(json.data)
                    // alert(JSON.stringify(pruebita))
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

    const changeCheck = (id, value) => {
        const NewArray = cards.map(item => {
            if (item.id == id){
                item.selected = value
            }
            return item
        })
        alert(JSON.stringify(NewArray))
        setCards(NewArray)
    }

    const senData = () => {
        alert(JSON.stringify(collectData))
    }
    

    const renderItem = ({item}) => {
        return (
            <View style={styles.card}>
                <TouchableHighlight>
                    <View>
                        <View style={{ paddingVertical: 14, paddingHorizontal: 10}}>
                            <Text style={{height: 32, fontSize: 12}}>{item.title}</Text>
                        </View>
                        <CheckBox
                            disabled={false}
                            value={collectData[item.code].selected}
                            onValueChange={(newValue) => { setCollectData({...collectData, [item.code]: {...item, selected: newValue}} ) }}
                        />
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    return (
        <ScrollView>
            <>
                {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> :
                    (<FlatList data={cards} numColumns={2} renderItem={renderItem} columnWrapperStyle={{justifyContent: 'space-between', paddingHorizontal: 14}} keyExtractor={((item, i) => i)} />)
                }
            </>
            <TouchableOpacity onPress={senData} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Enviar</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
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
        shadowRadius: 2
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