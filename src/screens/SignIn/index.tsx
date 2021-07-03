import React from 'react';
import { View, Text, Image, Alert } from 'react-native';

import { useAuth } from '../../hooks/auth';

import IllustrationImg from '../../assets/illustration.png';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

import { styles } from './styles';

export function SignIn() {
    const { user, singIn } = useAuth();

    async function handleSignIn() {
        try {
            await singIn();
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

                    <ButtonIcon 
                        title="Enter with Discord"
                        onPress={handleSignIn}
                        />
                </View>
            </View>
        </Background>
    );
}