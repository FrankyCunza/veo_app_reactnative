import React, { useState, useEffect } from 'react';
import { View, Text, useWindowDimensions, ScrollView} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements'
import RenderHtml from 'react-native-render-html';
import Title from '../components/title';

let hola=true;
const prueba = ( { route, navigation } ) => {
    return (
        <ScrollView>
            <Title title={'Hola'} />
        </ScrollView>
    )
}

export default prueba;