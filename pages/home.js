import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';
import tw from 'tailwind-react-native-classnames';

const Home = ( { route, navigation} ) => {
    const [cards, setCards] = useState([]);
    const [brand, setBrand] = useState("")
    const [isLoading, setLoading] = useState(true);
    const { id, token } = route.params;
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselItems = [
        {
            title:"Item 1",
            text: "Text 1",
        },
        {
            title:"Item 2",
            text: "Text 2",
        },
        {
            title:"Item 3",
            text: "Text 3",
        },
        {
            title:"Item 4",
            text: "Text 4",
        },
        {
            title:"Item 5",
            text: "Text 5",
        },
    ]

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
            <View style={[tw`bg-white w-5/12 rounded mt-4 h-28 shadow-sm`, {width: '48%'}]}>
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
    const _renderItem = ({item,index}) => {
        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 250,
              padding: 50,
              marginLeft: 25,
              marginRight: 25, }}>
            <Text style={{fontSize: 30}}>{item.title}</Text>
            <Text>{item.text}</Text>
          </View>

        )
    }

    const next = () => {
        setActiveIndex(2)
        // alert("Hello")
    }

    return (
        <View style={tw`bg-gray-100 h-full`}>
            <Carousel
                layout={"default"}
                //   Carousel.snapToNext()
                // ref={ref => Carousel = ref}
                data={carouselItems}
                sliderWidth={300}
                itemWidth={300}
                renderItem={_renderItem}
                onSnapToItem = { index => setActiveIndex(index) } />

            <View style={[tw`bg-white w-5/12 rounded mt-4 h-10 shadow-sm`, {width: '48%'}]}>
                <TouchableHighlight onPress={() => {next()}} style={[tw``, {}]}>
                    <View style={tw`h-full justify-center items-center`}>
                        <Text style={tw`text-gray-800 text-center px-2 text-sm leading-4 mt-2`}>Press</Text>
                    </View>
                </TouchableHighlight>
            </View>

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
            {isLoading ? <ActivityIndicator size="small" color="#0000ff" style={tw`py-8`} /> :
                (<FlatList data={cards} numColumns={2} renderItem={renderItem} columnWrapperStyle={{justifyContent: 'space-between', paddingHorizontal: 14, flex: 2}} keyExtractor={((item, i) => item.title)} />)
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