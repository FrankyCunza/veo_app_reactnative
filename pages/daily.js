import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

const Daily = ({navigation}) => {
    const [cards, setCards] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const id = await AsyncStorage.getItem('id')
            fetch('https://gateway.vim365.com/checkcards/cards?company_id=1&end_point=demo&page=daily-test', {
                headers: {
                    'Content-Type': 'application/json',
                    'security-header': 'Vim365Aputek/2020.04',
                    Authorization: token,
                    id: id
                }
                })
                .then((response) => response.json())
                .then((json) => {
                    setCards(json.data)
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

    const goPage = (name) => {
        // routerLink
        navigation.navigate(name, {
            term: name
        })
    }

    const renderItem = ({item}) => {
        return (
            <View style={styles.card}>
                <TouchableHighlight onPress={() => {goPage(item.routerLink)}}>
                    <View>
                    {/* <Image
                    source={{
                    uri: getImage(item.icon),
                    width: '100%',
                    height: 120
                    }}
                    /> */}
                        <View style={{ paddingVertical: 14, paddingHorizontal: 10}}>
                            <Text style={{height: 32, fontSize: 12}}>{item.title}</Text>
                        </View>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    return (
        <View>
            <>
                {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> :
                    (<FlatList data={cards} numColumns={2} renderItem={renderItem} columnWrapperStyle={{justifyContent: 'space-between', paddingHorizontal: 14}} keyExtractor={((item, i) => i)} />)
                }
            </>
        </View>
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 12
    }
})

export default Daily