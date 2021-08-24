import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableHighlight, useWindowDimensions } from 'react-native'
import Title from '../components/title';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';
import tw from 'tailwind-react-native-classnames';

const SliderProtocols = ( { route } ) => {
    const { title, data } = route.params;
    const [activeIndex, setActiveIndex] = useState(0);
    const [carousel, setCarousel] = useState()
    const { width } = useWindowDimensions();

    const carouselItems = [
        {
            title:"Item 1",
            text: "Text 1",
        },
        {
            title:"Item 2",
            text: "Text 2",
        },
        {
            title:"Item 3",
            text: "Text 3",
        },
        {
            title:"Item 4",
            text: "Text 4",
        },
        {
            title:"Item 5",
            text: "Text 5",
        },
    ]
    useEffect(() => {
        // alert(JSON.stringify(data))
    }, [])

    const next = () => {
        carousel.snapToNext()
    }

    const _renderItem = ({item,index}) => {
        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 250,
              padding: 14,
              marginLeft: 0,}}>
            <Text style={{fontSize: 16}}>{item.instructions}</Text>
          </View>
        )
    }

    return (
        <ScrollView>
            <Title title={title} />
            <Carousel
                layout={"default"}
                //   Carousel.snapToNext()
                ref={ref => setCarousel(ref)}
                data={data.steps}
                sliderWidth={width}
                itemWidth={300}
                renderItem={_renderItem}
                onSnapToItem = { index => setActiveIndex(index) } />
            <View style={[tw`px-4 items-center`, {}]}>
                <View style={[tw`bg-white w-5/12 rounded-full mt-4 h-10 shadow-sm`, {width: '48%'}]}>
                    <TouchableHighlight onPress={() => {next()}} style={[tw``, {}]}>
                        <View style={tw`h-full justify-center items-center`}>
                            <Text style={tw`text-gray-800 text-center px-2 text-sm leading-4`}>Next</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
            {/* <View style={tw`px-4 -mt-4`}>
                {data.steps ? (
                    data.steps.map((item, index) => {
                        return (
                            <View style={tw`bg-white rounded shadow mt-4 px-6 py-6`} key={'steps'+index}>
                                <View>
                                    <Text style={tw`font-medium text-base`}>{item.instructions}</Text>
                                </View>
                            </View>
                        )
                    })
                ) : <></>}
            </View> */}
        </ScrollView>
    )
}

export default SliderProtocols