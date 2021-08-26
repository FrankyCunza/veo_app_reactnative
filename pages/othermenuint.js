import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const othermenuint = ({ route, navigation}) => {
    const {term, buttons, form} = route.params
    return (
        <View>
            <Text>{term}</Text>
        </View>
    )
}

export default othermenuint

const styles = StyleSheet.create({})
