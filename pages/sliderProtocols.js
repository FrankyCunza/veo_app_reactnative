import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import Title from '../components/title';
import tw from 'tailwind-react-native-classnames';

const SliderProtocols = ( { route } ) => {
    const { title, data } = route.params;
    useEffect(() => {
        // alert(JSON.stringify(data))
    }, [])
    return (
        <View>
            <Title title={title} />
            <View style={tw`px-4 -mt-4`}>
                {data.steps ? (
                    data.steps.map((item, index) => {
                        return (
                            <View style={tw`bg-white rounded shadow mt-4 px-6 py-6`}>
                                <View key={'steps'+index}>
                                    <Text style={tw`font-medium text-base`}>{item.instructions}</Text>
                                </View>
                            </View>
                        )
                    })
                ) : <></>}
            </View>
        </View>
    )
}

export default SliderProtocols