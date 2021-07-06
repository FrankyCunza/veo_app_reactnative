import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Daily = () => {

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('storage_Key')
          alert(jsonValue)
        } catch(e) {
          // error reading value
        }
    }

    return (
        <View>
            <Text>Hello Daiiily!</Text>
        </View>
    )
}

export default Daily