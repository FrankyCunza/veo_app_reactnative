import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, ActivityIndicator, TouchableHighlight, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements'
import Title from '../components/title';

const categoriesInformed = ( { route, navigation } ) => {
    const [isLoading, setLoading] = useState(true)
    const { title, articles } = route.params;
    const [data, setData] = useState([])
    
    useEffect(() => {
        setData(articles.articles)
        setLoading(false)
        // alert(JSON.stringify(route.params))
    }, [title])

    const renderItem = ( { item } ) => {
        return (
            <View style={[tw`mt-3 px-4 relative`]}>
                <TouchableHighlight style={[tw`relative`, {}]} onPress={() => {goPage(item)}}>
                    <View style={tw`bg-white px-4 py-6 shadow rounded`}>
                        <Text style={tw`text-lg`}>{item.name}</Text>
                        <View style={tw`absolute top-5 right-2 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center`}>
                            <Icon style={tw``} name="arrowright" color="black" type="antdesign" />
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    const goPage = (item) => {
        // routerLink
        navigation.navigate('/contentInformed', {
            title: item.name,
            data: item
        })
    }

    return (
        <View>
            <Title title={title} />
            {isLoading  ? <ActivityIndicator style={tw`py-12`} size="small" color="#0000ff" /> :
                (
                    <FlatList data={data} style={tw`pb-4 -mt-4`} renderItem={renderItem} keyExtractor={((item, i) => item.name)} />
                )
            }
        </View>
    )
}

export default categoriesInformed;