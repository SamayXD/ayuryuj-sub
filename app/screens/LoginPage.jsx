import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import React, { useState, useRef } from 'react'
import { Feather } from '@expo/vector-icons'
import { colors } from '../utils/colors'
import { responsive } from '../utils/basicUtils'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'

export const useOtpInput = (length = 4) => {
    const [otp, setOtp] = useState(new Array(length).fill(''))
    const inputRefs = useRef([])

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto focus next input
        if (value !== '' && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyPress = (event, index) => {
        // Handle backspace
        if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    return {
        otp,
        setOtp,
        inputRefs,
        handleOtpChange,
        handleKeyPress,
        otpValue: otp.join('')
    }
}

const LoginPage = () => {
    const insets = useSafeAreaInsets()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showOtpSection, setShowOtpSection] = useState(false)
    const { otp, inputRefs, handleOtpChange, handleKeyPress, otpValue } = useOtpInput()

    const handleSendOtp = () => {
        // Validate phone number
        if (phoneNumber.length !== 10) {
            // Show error
            return
        }
        // Send OTP API call here
        setShowOtpSection(true)
    }

    const handleVerifyOtp = () => {
        if (otpValue.length !== 4) {
            // Show error
            return
        }
        // Verify OTP API call here
        router.replace('/screens/main')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { paddingTop: insets.top }]}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>
                    Enter your phone number to continue
                </Text>
            </View>

            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <View style={styles.phoneInput}>
                        <Text style={styles.countryCode}>+91</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter phone number"
                            keyboardType="number-pad"
                            maxLength={10}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>
                </View>

                {showOtpSection ? (
                    <View style={styles.otpSection}>
                        <Text style={styles.otpTitle}>Enter OTP</Text>
                        <Text style={styles.otpSubtitle}>
                            Enter the 4-digit code sent to your phone
                        </Text>

                        <View style={styles.otpContainer}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    style={styles.otpInput}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    value={digit}
                                    onChangeText={(value) => handleOtpChange(value, index)}
                                    onKeyPress={(event) => handleKeyPress(event, index)}
                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                />
                            ))}
                        </View>

                        <TouchableOpacity
                            style={styles.resendButton}
                            onPress={handleSendOtp}
                        >
                            <Text style={styles.resendText}>Resend OTP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleVerifyOtp}
                        >
                            <Text style={styles.buttonText}>Verify & Continue</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSendOtp}
                    >
                        <Text style={styles.buttonText}>Send OTP</Text>
                    </TouchableOpacity>
                )}
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: responsive.wp(4),
        backgroundColor: colors.surface,
    },
    title: {
        fontSize: responsive.wp(6),
        fontWeight: '600',
        color: colors.text,
        marginBottom: responsive.hp(1),
    },
    subtitle: {
        fontSize: responsive.wp(3.5),
        color: colors.text,
        opacity: 0.7,
    },
    content: {
        flex: 1,
        padding: responsive.wp(4),
    },
    inputContainer: {
        marginBottom: responsive.hp(3),
    },
    phoneInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: responsive.wp(2),
        padding: responsive.wp(3),
        borderWidth: 1,
        borderColor: colors.background,
    },
    countryCode: {
        fontSize: responsive.wp(4),
        fontWeight: '500',
        color: colors.text,
        marginRight: responsive.wp(2),
        paddingRight: responsive.wp(2),
        borderRightWidth: 1,
        borderRightColor: colors.background,
    },
    input: {
        flex: 1,
        fontSize: responsive.wp(4),
        color: colors.text,
        padding: 0,
    },
    button: {
        backgroundColor: colors.primary,
        padding: responsive.hp(2),
        borderRadius: responsive.wp(2),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: colors.surface,
        fontSize: responsive.wp(4),
        fontWeight: '600',
    },
    otpSection: {
        marginTop: responsive.hp(4),
    },
    otpTitle: {
        fontSize: responsive.wp(4.5),
        fontWeight: '600',
        color: colors.text,
        marginBottom: responsive.hp(1),
    },
    otpSubtitle: {
        fontSize: responsive.wp(3.5),
        color: colors.text,
        opacity: 0.7,
        marginBottom: responsive.hp(3),
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: responsive.hp(3),
    },
    otpInput: {
        width: responsive.wp(15),
        height: responsive.wp(15),
        borderRadius: responsive.wp(2),
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.background,
        textAlign: 'center',
        fontSize: responsive.wp(5),
        fontWeight: '600',
        color: colors.text,
    },
    resendButton: {
        alignSelf: 'center',
        marginBottom: responsive.hp(3),
    },
    resendText: {
        fontSize: responsive.wp(3.5),
        color: colors.primary,
        fontWeight: '500',
    },
})