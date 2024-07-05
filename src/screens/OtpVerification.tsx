//import liraries
import React, { Component, useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';

import { moderateScale, moderateScaleVertical, textScale } from '../styles/responsiveSize';
import colors from '../styles/colors';
import HeaderComp from '../components/Header/Header';
import ButtonComp from '../components/Button/Button';
import { Container } from '../components/Container/Container';
import { showError, showSucess } from '../utiles/helpers';
import useLoginOtpVerify from '../hooks/auth/otp-verify';
import { AuthContext } from '../utiles/authContext';

const OtpVerification = () => {

    // init
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const input = useRef(null)
    const route = useRoute()
    const { useremail }: any = route.params
    const authContext: any = useContext(AuthContext);

    // states
    const [timer, setTimer] = useState(59);
    const [isLoading, setLoading] = useState(false)
    const [otpInput, setOtpInput] = useState("");

    // api call
    const useLoginOtpVerifyMutation = useLoginOtpVerify()

    const handleCellTextChange = async (text: String, i: number) => {

    };
console.log(authContext);

    const onDone = async () => {
        if (otpInput === '') {
            showError('Please Enter OTP')
        } else {
            const payload = {
                email: useremail,
                otp: otpInput
            }

            useLoginOtpVerifyMutation.mutate(payload, {
                onSuccess: (data) => {
                    showSucess('Login Successfully')

                    if (data?.data?.message === 'Successfully saved') {

                        authContext.setAuthState({
                            accessToken: data?.data?.token,
                            name: data?.data?.name,
                            authenticated: true,
                        })

                    }

                }
            })
        }
    }

    return (
        <Container statusBarStyle='dark-content'>
            <HeaderComp onPressLeft={() => { navigation.goBack() }} />

            <KeyboardAvoidingView
                style={{ flex: 1, margin: moderateScale(16) }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>

                        <View style={{ flex: 0.5 }}>

                            <Text style={styles.headerStyle} numberOfLines={1}>Enter the code sent to you at {useremail}</Text>

                            <OTPTextView
                                ref={input}
                                textInputStyle={styles.textInputContainer}
                                handleTextChange={setOtpInput}
                                handleCellTextChange={handleCellTextChange}
                                inputCount={6}
                                keyboardType="numeric"
                                autoFocus
                                tintColor={colors.whiteColor}
                                offTintColor={colors.whiteColorOpacity40}

                            />

                        </View>

                        <View style={{ flex: 0.4, justifyContent: 'flex-end', marginBottom: moderateScaleVertical(16) }} >

                            <ButtonComp
                                text={"Verify"}
                                onPress={onDone}
                                isLoading={useLoginOtpVerifyMutation?.isPending}
                                disabled={useLoginOtpVerifyMutation.isPending}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </Container>
    );
};


const styles = StyleSheet.create({
    headerStyle: {
        fontSize: textScale(16),
        color: colors.whiteColor,
        marginTop: moderateScale(110),
        width: moderateScale(340)


    },
    descStyle: {
        fontSize: textScale(14),

        color: colors.blueColor,
        marginTop: moderateScaleVertical(8),
        marginBottom: moderateScaleVertical(52)
    },
    textInputContainer: {
        backgroundColor: colors.gray2,
        borderBottomWidth: 0,
        borderRadius: 8,
        color: colors.whiteColor,
        marginTop: moderateScale(60)

    },
    resendCodeStyle: {
        fontSize: textScale(14),
        marginTop: moderateScaleVertical(8),
        marginBottom: moderateScaleVertical(16)
    }
});


export default OtpVerification;