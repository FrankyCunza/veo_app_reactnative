import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import tw from 'tailwind-react-native-classnames';

const Title = ( { title } ) => {
    return (
        <View style={tw`px-4 py-4`}>
            <Text style={tw`text-3xl font-bold text-gray-800`}>{title}</Text>
        </View>
    )
}

export default Title