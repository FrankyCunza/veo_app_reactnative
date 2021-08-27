import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableHighlight, useWindowDimensions, StyleSheet, ActivityIndicator, Image } from 'react-native'
import Title from '../components/title';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';
import tw from 'tailwind-react-native-classnames';
import CheckBox from '@react-native-community/checkbox';
import { HHMMSS, dateYYYYMMDD } from '../utils/utils';
import { Icon } from 'react-native-elements'

const SliderProtocols = ( { route, navigation } ) => {
    const { title, data } = route.params;
    const [activeIndex, setActiveIndex] = useState(0);
    const [carousel, setCarousel] = useState()
    const { width } = useWindowDimensions();
    const [steps, setSteps] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [response, setResponse] = useState({})

    useEffect(() => {
        // alert(JSON.stringify(data))
        for (let item of data.steps) {
            steps[item.id] = {...item, "selected": undefined}
        }
        setLoading(false)
    }, []) 

    const next = () => {
        carousel.snapToNext()
    }

    const senData =  async () => {
        let answers = []
        for (const [key, val] of Object.entries(steps)) {
            answers.push({
              "code": parseInt(key),
              "response": steps[key]['selected']  
            })
        }
        
        try {
            // Data Storage
            const keys = await AsyncStorage.getAllKeys()
            const itemsArray = await AsyncStorage.multiGet(keys)
            let object = {}
            itemsArray.map(item => {
                if (item[0] == 'area_id' 
                    || item[0] == 'branch_id' 
                    || item[0] == 'company_id' 
                    || item[0] == 'document' 
                    || item[0] == 'end_point' 
                    || item[0] == 'full_name' 
                    || item[0] == 'job_id' 
                    || item[0] == 'worker_id' 
                ) {
                    object[`${item[0]}`] = item[1]
                }
            })
            
            // Traffic
            const total = Object.values(steps).reduce((t, {value, selected}) => {
                if (selected) {
                  return t + parseFloat(value)
              } else {
                  return t
              }
            }, 0)
            let traffic = ''
            let green = data.steps.length / 3
            let yellow = green * 2
            if (total < green) {
                traffic = 'green'
            } else if (total < yellow) {
                traffic = 'yellow'
            } else {
                traffic = 'red'
            }

            // Collect Data
            let dataSend = {
                ...object,
                "form": {
                    "code": data.id,
                    "traffic": traffic,
                    "is_protocol": true,
                    "version": 4.00,
                    "answers": answers
                },
                "date": dateYYYYMMDD(),
                "hour": HHMMSS(),
            }
            const token = await AsyncStorage.getItem('token')
            const id = await AsyncStorage.getItem('id')
            fetch('https://gateway.vim365.com/saveform/saveform', {
                method: 'POST',
                body: JSON.stringify(dataSend),
                headers: {
                    'Content-Type': 'application/json',
                    'security-header': 'Vim365Aputek/2020.04',
                    Authorization: token,
                    id: id
                }
                })
                .then((response) => response.json())
                .then((json) => {
                    alert(JSON.stringify(json))
                    setResponse(json)
                })
                .catch((error) => {
                    alert('Error Save Form1', error)
            });
          } catch(e) {
            alert('Error Save Form', e)
        }
    }

    const getImage = (image) => {
        if (image.includes('/static/img')) {
            // alert(JSON.stringify('https://scraprix.com/img/svgtopng/'+image.split('../assets/svgs/')[1]))
            return 'https://scraprix.com/img/svgtopng/'+image.split('/static/img/protocols/')[1].replace(".svg", ".png")
        }
    }

    const _renderItem = ({item,index}) => {
        return (
          <View style={[tw`bg-white py-14 px-5 items-center`, {borderRadius: 5,
            //   height: 250,
              marginLeft: 0}]}>
            <Image style={{width: 50, height: 50, resizeMode: 'contain'}} source={{uri: getImage(item.icon)}} />
            <Text style={[tw`text-center mt-4 mb-2`, {fontSize: 18}]}>{item.instructions}</Text>
            <View style={tw`flex-row justify-center`}>
                <View style={[tw`bg-white rounded-full mt-4 h-10 shadow`, { width: '30%' }, steps[item.id].selected == undefined ? tw`opacity-20` : 'opacity-100', steps[item.id].selected ? tw`bg-blue-600` : '']}>
                    <TouchableHighlight style={[tw``, {}]} onPress={() => {}}>
                        <View style={tw`h-full justify-center items-center`}> 
                            <Text style={[tw`text-center px-2 text-base`, steps[item.id].selected ? tw`text-white` : tw`text-gray-800`]}>Yes</Text>
                            <CheckBox
                                disabled={false}
                                style={styles.checkbox}
                                value={steps[item.id].selected}
                                onValueChange={(newValue) => { setSteps({...steps, [item.id]: {...item, selected: true}} ) }}
                            />
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={[tw`bg-white rounded-full mt-4 h-10 shadow ml-2`, { width: '30%' }, steps[item.id].selected == undefined ? tw`opacity-20` : 'opacity-100', !steps[item.id].selected && steps[item.id].selected!==undefined ? tw`bg-blue-600` : '']}>
                    <TouchableHighlight style={[tw``, {}]} onPress={() => {}}>
                        <View style={tw`h-full justify-center items-center`}> 
                            <Text style={[tw`text-center px-2 text-base`, steps[item.id].selected||steps[item.id].selected==undefined ? tw`text-gray-800` : tw`text-white`]}>No</Text>
                            <CheckBox
                                disabled={false}
                                style={styles.checkbox}
                                value={steps[item.id].selected}
                                onValueChange={(newValue) => { setSteps({...steps, [item.id]: {...item, selected: false}} ) }}
                            />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
          </View>
        )
    }

    return (
        <ScrollView style={tw`pb-4`}>
            <Title title={title} navigation={navigation} />
            <Carousel
                layout={"default"}
                //   Carousel.snapToNext()
                ref={ref => setCarousel(ref)}
                data={data.steps}
                sliderWidth={width}
                // enableSnap={false}
                scrollEnabled={false}
                itemWidth={width-28}
                renderItem={_renderItem}
                onSnapToItem = { index => setActiveIndex(index) } />
            {isLoading ? <ActivityIndicator size="small" color="#0000ff" style={tw`py-8`} /> : 
                (
                    Object.keys(data.steps).length-1==activeIndex ? 
                    <View style={[tw`px-4 items-center`, steps[Object.keys(steps)[activeIndex]].selected == undefined ? tw`opacity-30` : tw`opacity-100`, {}]}>
                        <View style={[tw`bg-white rounded-full mt-4 h-12 shadow-sm px-8`, {}]}>
                            <TouchableHighlight onPress={() => {steps[Object.keys(steps)[activeIndex]].selected == undefined ? '': senData()}} style={[tw``, {}]}>
                                <View style={tw`h-full justify-center items-center flex-row`}>
                                    <Text style={tw`text-gray-800 text-center px-2 text-lg mr-2`}>Finalizar</Text>
                                    <Icon style={tw``} name="arrowright" color="black" type="antdesign" size={14} />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View> : 
                    <View style={[tw`px-4 items-center pb-4`, steps[Object.keys(steps)[activeIndex]].selected == undefined ? tw`opacity-30` : tw`opacity-100`, {}]}>
                        <View style={[tw`bg-white rounded-full mt-4 h-12 shadow-sm`, {}]}>
                            <TouchableHighlight onPress={() => {steps[Object.keys(steps)[activeIndex]].selected == undefined ? '': next()}} style={[tw`px-8 rounded-full`, {}]}>
                                <View style={tw`h-full justify-center items-center flex-row`}>
                                    <Text style={tw`text-gray-800 text-center px-2 text-lg mr-2`}>Next</Text>
                                    <Icon style={tw``} name="arrowright" color="black" type="antdesign" size={18} />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                )
            }
            
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

const styles = StyleSheet.create({
    checked: {
        backgroundColor: 'red'
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    checkbox: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'red',
        opacity: 0
    },
    card: {
        backgroundColor: 'red',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 15,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        width: '48%',
        backgroundColor: 'white', 
        borderRadius: 4, 
        marginTop: 13,
        overflow: 'hidden', 
        shadowColor: '#000', 
        shadowOffset: {width: 0, height: 2}, 
        shadowOpacity: 1, 
        shadowRadius: 2,
        position: 'relative',
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }, 
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 12
    }
})

export default SliderProtocols