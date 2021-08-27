import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements'

const Title = ( { title, navigation } ) => {
    return (
        <View style={[tw`px-4 py-4 items-center`, {flexDirection: 'row'}]}>
            <View style={tw`w-8 h-8 bg-gray-50 mr-3 rounded flex items-center justify-center`}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-full h-full items-center justify-center`}>
                    <Icon style={tw``} name="arrowleft" color="black" type="antdesign" size={15} />
                </TouchableOpacity>
            </View>
            <Text style={tw`text-xl font-bold text-gray-900`}>{title}</Text>
        </View>
    )
}

export default Title