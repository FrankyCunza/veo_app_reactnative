import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import Title from '../components/title';
const SliderProtocols = ( { route } ) => {
    const { title, data } = route.params;
    return (
        <View>
            <Title title={title} />
        </View>
    )
}

export default SliderProtocols