import React from 'react';
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';

import { useAuth } from '../../hooks/auth';

import IllustrationImg from '../../assets/illustration.png';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export function SignIn() {
    const { loading, signIn } = useAuth();

    async function handleSignIn() {
        try {
            await signIn();
        } catch (error) {
            Alert.alert(error);
        }
    }
    return (
        <Background>
            <View style={styles.container}>
                
                <Image source={IllustrationImg} style={styles.image} resizeMode="stretch"/>

                <View style={styles.content}>
                    <Text style={styles.title}>
                Connect and organize {'\n'}
                    your games
                    </Text>

                    <Text style={styles.subtitle}>
                        Create groups to play your favorite {'\n'}
                        games with your friends
                    </Text>

                    {   loading ? <ActivityIndicator color={theme.colors.primary} /> :
                        <ButtonIcon 
                            title="Enter with Discord"
                            onPress={handleSignIn}
                        />
                    }
                </View>
            </View>
        </Background>
    );
}