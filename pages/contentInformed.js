import React, { useState, useEffect } from 'react';
import { View, Text, useWindowDimensions, ScrollView} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements'
import RenderHtml from 'react-native-render-html';
import Title from '../components/title';

const contentInformed = ( { route, navigation } ) => {
    const [isLoading, setLoading] = useState(true)
    const { title, content } = route.params;
    const { width } = useWindowDimensions();
    const [data, setData] = useState([])
    const source = {
        html: content.content
    };
    useEffect(() => {
        setLoading(false)
        // alert(JSON.stringify(route.params))
    }, [title])

    return (
        <ScrollView>
            <Title title={title} navigation={navigation} />
            <View style={tw`px-4`}>
                <View style={tw`bg-white rounded shadow p-4`}>
                    <RenderHtml
                    contentWidth={width-60}
                    source={source}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default contentInformed;