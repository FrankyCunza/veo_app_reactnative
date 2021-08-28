import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames';
import { getImage } from '../utils/utils';
const ButtonList = ( { props, navigation } ) => {
    // alert(JSON.stringify(props))
    const [data, setData] = useState(props)
    useEffect(() => {
        // alert(JSON.stringify(data))
    }, [])

    const goPage = (route,item) => {
        navigation.navigate(route, {
            buttons: item.template.buttons,
            form: item.template.form
        })
    }

    return (
        <View style={[tw``, {width: '100%'}]}>
            <TouchableHighlight onPress={() => {goPage(data.route, data)}} style={[tw`bg-white rounded-xl mt-4 h-16 p-3`, {}]}>
                <View style={[tw`h-full items-center`, {display: 'flex', flexWrap: 'nowrap', flexDirection: 'row'}]}>
                    <View style={tw`bg-gray-50 rounded p-2`}>
                        <Image style={{width: 30, height: 30, resizeMode: 'contain'}} source={{uri: getImage(data.icon)}} />
                    </View>
                    <Text style={tw`text-gray-800 text-center px-2 text-sm leading-4`}>{data.name}</Text>
                    <View style={tw`absolute top-1 right-1 w-8 h-8 bg-gray-50 rounded flex items-center justify-center`}>
                        <Icon style={tw``} name="arrowright" color="black" type="antdesign" size={14} />
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    )
}

export default ButtonList

const styles = StyleSheet.create({})
