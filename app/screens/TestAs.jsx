import { StyleSheet, Text, TextInput, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { useState } from 'react'



const TestAs = () => {
    // const [temp, setTemp] = setCustomStore(temp, "value")

    function setStore(value) {

        const [tvalue, setTvalue] = useState()
        async function setLocalStorage(tvalue) {
            try {
                await AsyncStorage.setItem(`${tvalue}`, tvalue);
                console.log("DONE")
            } catch (e) {
                console.log(e)
            }
        }

        return setStore;
    }

    const setCustomStore = async (myKey, myValue) => {

        try {
            await AsyncStorage.setItem(`${myKey}`, myValue);
            console.log("DONE")
        } catch (e) {
            console.log(e)
        }
    }

    const getCustomStore = async (myKey) => {
        try {
            const value = await AsyncStorage.getItem(`${myKey}`);
            if (value !== null) {
                console.log(myKey, value)
            }
        } catch (e) {
            // error reading value
            console.log(e)
        }
    }


    useState(() => {
        // setCustomStore("test-key", "HEY THERE")
        // getCustomStore("test")
        // getCustomStore("test-key")

        setStore("temp")
    }, [])


    // return (
    //     <View style={{
    //         justifyContent: "center",
    //         flex: 1
    //     }}>
    //         <Text>TestAs</Text>

    //     </View>
    // )
}

export default TestAs

const styles = StyleSheet.create({})