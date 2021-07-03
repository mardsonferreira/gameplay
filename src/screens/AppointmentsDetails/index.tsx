import React from 'react';
import { ImageBackground, Text, View, FlatList } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';


import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import BannerImg from '../../assets/banner.png'; 

import { Header } from '../../components/Header';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';


export function AppointmentsDetails() {
    const members = [
        {
            id: '1',
            username: 'Mardson',
            avatar_url: 'https://github.com/mardsonferreira.png',
            status: 'online'
        },
        {
            id: '2',
            username: 'Mardson',
            avatar_url: 'https://github.com/mardsonferreira.png',
            status: 'offline'
        }
    ]
    return (
        <Background>
            <Header 
            title="Details"
            action={
                <BorderlessButton>
                    <Fontisto name="share" size={24} color={theme.colors.primary} />
                </BorderlessButton>
            }
            />

            <ImageBackground source={BannerImg} style={styles.banner}>
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>Legendary</Text>
                    <Text style={styles.subtitle}>
                        É hoje que vamos chegar ao challenger sem perder uma partida da md10
                    </Text>
                </View>
            </ImageBackground>

            <ListHeader title="Players" subtitle="Total 3"/>

            <FlatList 
                data={members} 
                keyExtractor={item => item.id} 
                renderItem={({item}) => (
                    <Member data={item} />
                )}
                ItemSeparatorComponent={() => <ListDivider isCentered />}
                style={styles.members}
            />

            <View style={styles.footer}>
                <ButtonIcon title="Join the match" />
            </View>

         </Background>
    );
}
