import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'tailwind-react-native-classnames';

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
                // alert(JSON.stringify(json.data))
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

    const goJitsi = () => {
        navigation.navigate('Video', {
            term: 'name'
        })
    }

    const renderItem = ({item}) => {
        return (
            <View style={[tw`bg-white w-5/12 rounded mt-4 h-28 shadow`, {width: '48%'}]}>
                <TouchableHighlight onPress={() => {goPage(item.routerLink)}} style={[tw``, {}]}>
                    <View style={tw`h-full justify-center items-center`}>
                        {/* <Image
                        source={{
                        uri: getImage(item.icon),
                        width: '100%',
                        height: 120
                        }}
                        /> */}
                        <Image style={{width: 45, height: 45, resizeMode: 'contain'}} source={{uri: "https://image.flaticon.com/icons/png/512/1021/1021606.png"}} />
                        <Text style={tw`text-gray-800 text-center px-2 text-sm leading-4 mt-2`}>{item.title}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    return (
        <View style={tw`bg-gray-200 h-full`}>
            <View style={[tw`bg-white w-5/12 rounded mt-4 h-28 shadow`, {width: '48%'}]}>
                <TouchableHighlight onPress={() => {goJitsi()}} style={[tw``, {}]}>
                    <View style={tw`h-full justify-center items-center`}>
                        <Image style={{width: 45, height: 45, resizeMode: 'contain'}} source={{uri: "https://image.flaticon.com/icons/png/512/1021/1021606.png"}} />
                        <Text style={tw`text-gray-800 text-center px-2 text-sm leading-4 mt-2`}>Jitsi</Text>
                    </View>
                </TouchableHighlight>
            </View>
            {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> :
                (<FlatList data={cards} numColumns={2} renderItem={renderItem} columnWrapperStyle={{justifyContent: 'space-between', paddingHorizontal: 14}} keyExtractor={((item, i) => item.title)} />)
            }
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