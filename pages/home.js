import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
    const [cards, setCards] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
          const token = await AsyncStorage.getItem('token')
          const id = await AsyncStorage.getItem('id')
          fetch('https://gateway.vim365.com/first-menu/menu', {
                headers: {
                    'security-header': 'Vim365Aputek/2020.04',
                    Authorization: token,
                    id: id
                }
            })
            .then((response) => response.json())
            .then((json) => {
                setCards(json.data)
                setLoading(false)
            })
            .catch((error) => {
                alert(error)
            });
        } catch(e) {
            alert(e)
        }
    }

    getImage = (image) => {
        if (image.includes('../assets')) {
            alert(JSON.stringify('https://mobile.vim365.com/assets/svgs/'+image.split('../assets/svgs/')[1]))
            return 'https://mobile.vim365.com/assets/svgs/'+image.split('../assets/svgs/')[1]
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
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    return (
        <View>
            {/* <Image
                    source={{
                    uri: require('./../assets/img/logo-veo365.png'),
                    width: 200,
                    height: 120
                    }}
            /> */}
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

export default Home