import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, View, FlatList, Alert, Share } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import BannerImg from '../../assets/banner.png'; 

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { api } from '../../services/api';

import { Header } from '../../components/Header';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointment';
import { Load } from '../../components/Load';

type ParamsProps = {
    guildSelected: AppointmentProps;
}

type widgetProps = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
}

export function AppointmentsDetails() {
    const [widget, setWidget] = useState<widgetProps>({} as widgetProps);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const { guildSelected } = route.params as ParamsProps;

    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
        } catch (error) {
            Alert.alert('Check the server settings');
        } finally {
            setLoading(false);
        }
    }

    function handleShareInvitation() {
        const message = `Join to ${guildSelected.guild.name}` ;

        Share.share({
            message,
            url: widget.instant_invite
        });
    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite);
    }

    useEffect(()=> {
        fetchGuildWidget();
    }, []);

    return (
        <Background>
            <Header 
            title="Details"
            action={
                guildSelected.guild.owner &&
                <BorderlessButton onPress={handleShareInvitation}>
                    <Fontisto name="share" size={24} color={theme.colors.primary} />
                </BorderlessButton>
            }
            />

            <ImageBackground source={BannerImg} style={styles.banner}>
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>{guildSelected.guild.name}</Text>
                    <Text style={styles.subtitle}>
                        {guildSelected.description}
                    </Text>
                </View>
            </ImageBackground>

            
            {
                loading ? <Load /> :
                <>
                    <ListHeader title="Players" subtitle={`Total ${widget.members.length}`}/>

                    <FlatList 
                        data={widget.members} 
                        keyExtractor={item => item.id} 
                        renderItem={({item}) => (
                            <Member data={item} />
                            )}
                        ItemSeparatorComponent={() => <ListDivider isCentered />}
                        style={styles.members}
                    />
                </>
            }

            {
                guildSelected.guild.owner &&
                <View style={styles.footer}>
                    <ButtonIcon 
                        title="Join the match" 
                        onPress={handleOpenGuild}    
                    />
                </View>
            }

         </Background>
    );
}
