import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, ActivityIndicator, TouchableHighlight, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements'
import Title from '../components/title';

const contentInformed = ( { route, navigation } ) => {
    const [isLoading, setLoading] = useState(true)
    const { title } = route.params;
    const [data, setData] = useState([])
    
    useEffect(() => {
        setLoading(false)
        // alert(JSON.stringify(route.params))
    }, [title])

    return (
        <View>
            <Title title={title} />
            <Text>Hello</Text>
        </View>
    )
}

export default contentInformed;