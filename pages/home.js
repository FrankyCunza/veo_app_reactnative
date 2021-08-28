import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableHighlight, ActivityIndicator, ScrollView, useWindowDimensions } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements'

const Home = ( { route, navigation} ) => {
    const [cards, setCards] = useState([]);
    const [brand, setBrand] = useState("")
    const [isLoading, setLoading] = useState(true);
    const { id, token } = route.params;
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (id && token) {
            getData()
            getBrand()
        }
    }, [])
    

    const getData = async () => {
        try {
        //   const token = await AsyncStorage.getItem('token')
        //   const id = await AsyncStorage.getItem('id')
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
                alert("Error: 1", error)
            });
        } catch(e) {
            alert("Error: 2", e)
        }
    }

    const getBrand = async () => {
        try {
          fetch('https://gateway.vim365.com/first-menu/logo', {
                headers: {
                    'security-header': 'Vim365Aputek/2020.04',
                    Authorization: token,
                    id: id
                }
            })
            .then((response) => response.json())
            .then((json) => {
                setBrand(json.image)
            })
            .catch((error) => {
                alert("Error: 1", error)
            });
        } catch(e) {
            alert("Error: 2", e)
        }
    }

    getImage = (image) => {
        if (image.includes('../assets')) {
            // alert(JSON.stringify('https://scraprix.com/img/svgtopng/'+image.split('../assets/svgs/')[1]))
            return 'https://scraprix.com/img/svgtopng/'+image.split('../assets/svgs/')[1].replace(".svg", ".png")
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
            <View style={[tw`bg-white rounded-xl mt-4 h-28 shadow-sm`, {width: '100%'}]}>
                <TouchableHighlight onPress={() => {goPage(item.routerLink)}} style={[tw``, {}]}>
                    <View style={tw`h-full justify-center items-center`}>
                        {/* <Image
                        source={{
                        uri: getImage(item.icon),
                        width: '100%',
                        height: 120
                        }}
                        /> */}
                        <Image style={{width: 45, height: 45, resizeMode: 'contain'}} source={{uri: getImage(item.icon)}} />
                        {/* <Image style={{width: 45, height: 45, resizeMode: 'contain'}} source={{uri: "https://image.flaticon.com/icons/png/512/1021/1021606.png"}} /> */}
                        <Text style={tw`text-gray-800 text-center px-2 text-sm leading-4 mt-2`}>{item.title}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    return (
        <ScrollView style={tw`bg-white px-4 pb-4`}>
            {/* {isLoading ? <ActivityIndicator size="small" color="#0000ff" style={tw`py-8`} /> :
                (<FlatList data={cards} numColumns={2} 
                    renderItem={renderItem} 
                    ListHeaderComponent={
                        <View style={[tw`py-3 items-center mt-4 mb-1 bg-transparent`, {display: 'flex', flexDirection: 'row', justifyContent: 'center'}]}>
                            <View>
                                <Image source={{uri: "https://veo365.com/assets/images/logo-veo-color-8.png"}} style={[tw`w-16 h-16`, { resizeMode: 'contain' }]} />
                            </View>
                            {brand ? (
                                <View style={tw`ml-6`}>
                                    <Image source={{uri: brand}} style={[tw`w-24 h-16`, { resizeMode: 'contain' }]} />
                                </View>
                            ) : <></>}
                        </View>
                    }
                    ListFooterComponent={
                        <View style={tw`pb-4`}></View>
                    }
                    columnWrapperStyle={{justifyContent: 'space-between', paddingHorizontal: 14, flex: 2}} keyExtractor={((item, i) => item.title)} />)
            } */}
            <View style={[tw`py-4 items-center mb-1 bg-transparent`, {display: 'flex', flexDirection: 'row', justifyContent: 'center'}]}>
                <View>
                    <Image source={{uri: "https://veo365.com/assets/images/logo-veo-color-8.png"}} style={[tw`w-12 h-12`, { resizeMode: 'contain' }]} />
                </View>
                {brand ? (
                    <View style={tw`ml-6`}>
                        <Image source={{uri: brand}} style={[tw`w-20 h-16`, { resizeMode: 'contain' }]} />
                    </View>
                ) : <></>}
            </View>
            <View style={tw`-mt-4 pb-4`}>
                {isLoading ? <ActivityIndicator size="small" color="#0000ff" style={tw`py-8`} /> :
                    cards.map((item, index) => {
                        return (
                            <View style={[tw``, {width: '100%'}]} key={'menu'+index}>
                                <TouchableHighlight onPress={() => {goPage(item.routerLink)}} style={[tw`bg-gray-100 rounded-xl mt-4 h-16 p-3`, {}]}>
                                    <View style={[tw`h-full items-center`, {display: 'flex', flexWrap: 'nowrap', flexDirection: 'row'}]}>
                                        <View style={tw`bg-white rounded p-2`}>
                                            <Image style={{width: 30, height: 30, resizeMode: 'contain'}} source={{uri: getImage(item.icon)}} />
                                        </View>
                                        <Text style={tw`text-gray-800 text-center px-2 text-sm leading-4`}>{item.title}</Text>
                                        <View style={tw`absolute top-1 right-1 w-8 h-8 bg-white rounded flex items-center justify-center`}>
                                            <Icon style={tw``} name="arrowright" color="black" type="antdesign" size={14} />
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        )
                    })
                }
            </View>
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 12
    }
})

export default Home