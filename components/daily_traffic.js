import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

const DailyTraffic = ({ name }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        // alert(name.length)
        setData(traffic)
        if (name) {
            getData()
        }
    }, [])

    const traffic = {
        "error":false,
        "data":[
           {
              "traffic_green":{
                 "title":"Bien",
                 "class":"green",
                 "icon":"traffic-green",
                 "description":"No eres un caso sospechoso, puedes seguir en casa y hacer tus actividades cotidianas.",
                 "recomendations":[
                    {
                       "name":"Siempre mant\u00e9n el distanciamiento social.",
                       "icon":"p2-2"
                    },
                    {
                       "name":"L\u00e1vate las manos con agua y jab\u00f3n por lo menos durante 20 segundos frecuentemente.",
                       "icon":"p2-5"
                    },
                    {
                       "name":"Usa tu mascarilla.",
                       "icon":"p2-3"
                    },
                    {
                       "name":"Al toser o estornudar c\u00fabrete la nariz y la boca con un pa\u00f1uelo descartable o con la flexura del codo, descarta el pa\u00f1uelo inmediatamente en un tacho y l\u00e1vate las mano.",
                       "icon":"p3-11"
                    }
                 ]
              },
              "traffic_yellow":{
                 "title":"Eres un caso sospechoso",
                 "icon":"traffic-yellow",
                 "class":"yellow",
                 "description":"Es recomendable que por el d\u00eda de hoy te mantengas en casa y aislado hasta que un especialista del \u00e1rea de Salud Ocupacional se comunique contigo. Debes comunicar tus s\u00edntomas al centro de salud m\u00e1s cercano. \u00a1Comunicados prevenimos mejor!",
                 "recomendations":[
                    {
                       "name":"Si presentas dificultad respiratoria mayor de 22 por minuto, tienes fiebre mayor de 38 grados por m\u00e1s de 2 d\u00edas, coloraci\u00f3n azulada de tus labios, te sientes confuso \u00f3 te desmayas debes acudir a un centro de salud. En el caso de ni\u00f1os si presentan dificultad para respirar o respiraci\u00f3n r\u00e1pida, fiebre persiste a pesar de medicamentos, irritable, no lacta o no come. (AE-013-2020)",
                       "icon":"dj22"
                    },
                    {
                       "name":"Siempre mant\u00e9n distanciamiento social con tus familiares en casa.",
                       "icon":"p2-4"
                    },
                    {
                       "name":"L\u00e1vate las manos con agua y jab\u00f3n por lo menos durante 20 segundos frecuentemente.",
                       "icon":"p2-5"
                    },
                    {
                       "name":"Usa la mascarilla en tu casa, solo te la puedes retirar para dormir.",
                       "icon":"p1-1"
                    },
                    {
                       "name":"Comun\u00edcate con el centro de salud m\u00e1s cercano para que te orienten en tu caso.",
                       "icon":"teleconsulta"
                    }
                 ]
              },
              "traffic_red":{
                 "title":"\u00a1Caso probable!",
                 "class":"red",
                 "icon":"traffic-red",
                 "description":"Es recomendable que por el d\u00eda de hoy te mantengas en casa y aislado hasta que un especialista del \u00e1rea de Salud Ocupacional se comunique contigo. Debes comunicar tus s\u00edntomas al centro de salud m\u00e1s cercano. \u00a1Comunicados prevenimos mejor!",
                 "recomendations":[
                    {
                       "name":"Si presentas dificultad respiratoria \u00f3 frecuencia respiratoria mayor de 22 por minuto, tienes fiebre mayor de 38 grados por m\u00e1s de 2 d\u00edas, coloraci\u00f3n azulada de tus labios, te sientes confuso \u00f3 te desmayas debes acudir a un centro de salud. En el caso de ni\u00f1os si presentan dificultad para respirar o respiraci\u00f3n r\u00e1pida, fiebre persiste a pesar de medicamentos, irritable, no lacta o no come (AE-013-2020).",
                       "icon":"dj22"
                    },
                    {
                       "name":"Siempre mant\u00e9n distanciamiento social con tus familiares en casa.",
                       "icon":"p2-4"
                    },
                    {
                       "name":"L\u00e1vate las manos con agua y jab\u00f3n por lo menos durante 20 segundos frecuentemente.",
                       "icon":"p2-5"
                    },
                    {
                       "name":"Usa la mascarilla en tu casa, solo te la puedes retirar para dormir.",
                       "icon":"p2-3"
                    },
                    {
                       "name":"Al toser o estornudar c\u00fabrete la nariz y la boca con un pa\u00f1uelo descartable o con la flexura del codo, descarta el pa\u00f1uelo inmediatamente en un tacho y l\u00e1vate las mano.",
                       "icon":"p3-9"
                    },
                    {
                       "name":"Comun\u00edcate con el centro de salud m\u00e1s cercano para que te orienten en tu caso.",
                       "icon":"teleconsulta"
                    }
                 ]
              }
           }
        ],
        "range":{
           "min_low_range":0,
           "max_low_range":5,
           "min_med_range":6,
           "max_med_range":10,
           "min_hig_range":11,
           "max_hig_range":20
        },
        "code":null
    }


    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const id = await AsyncStorage.getItem('id')
            const company_id = await AsyncStorage.getItem('company_id')
            const end_point = await AsyncStorage.getItem('end_point')
            fetch(`https://gateway.vim365.com/checkcards/cards?company_id=${company_id}&end_point=${end_point}&page=traffic-daily-test`, {
                headers: {
                    'Content-Type': 'application/json',
                    'security-header': 'Vim365Aputek/2020.04',
                    Authorization: token,
                    id: id
                }
                })
                .then((response) => response.json())
                .then((json) => {
                    // alert(JSON.stringify(json))
                    if (name == 'green') {
                        setData(json.data[0]['traffic_green'])
                    } else if (name == 'yellow') {
                        setData(json.data['traffic_yellow'])
                    } else {
                        setData(json.data[0]['traffic_red'])
                    }
                })
                .catch((error) => {
                    alert(error)
            });
          } catch(e) {
            alert(e)
        }
    }

    return (
        <>
            {name.length > 0 ? 
                (<View>
                    <Text>{ name }</Text>
                </View>)
            : (<></>)}
        </>
    )
}

export default DailyTraffic