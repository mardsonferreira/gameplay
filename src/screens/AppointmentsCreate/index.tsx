import React, { useState } from 'react';
import { 
    Text,
    View, 
    ScrollView, 
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { TextArea } from '../../components/TextArea';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';


export function AppointmentsCreate() {
    const [category, setCategory] = useState('');
    const [openGuildsModal, setOpenGuildsModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

    const [day, setyDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();

    function handleCategorySelected(categoryId: string) {
        setCategory(categoryId);
    }

    function handleOpenGuilds() {
        setOpenGuildsModal(true);
    }

    function handleCloseGuilds() {
        setOpenGuildsModal(false);
    }

    function handleGuildSelect(guildSelect: GuildProps) {
        setGuild(guildSelect);
        setOpenGuildsModal(false);        
    }

    async function handleSave() {
        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description
        };

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointments = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])
        );

        navigation.navigate('Home');
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Background>
                <ScrollView>
                    <Header title="Schedule match" />

                    <View style={styles.category}>
                        <Text style={styles.label}>Category</Text>
                    </View>

                    <CategorySelect 
                        hasCheckBox
                        categorySelected={category}
                        setCategory={handleCategorySelected}
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>
                                {
                                    guild.icon ? 
                                    <GuildIcon guildId={guild.id} iconId={guild.icon} /> 
                                    : <View style={styles.image} />
                                }
                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {guild.name ? guild.name : 'Select a guild'}
                                    </Text>
                                </View>

                                <Feather name="chevron-right" color={theme.colors.heading} size={18} />
                            </View>
                        </RectButton>
                        
                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, {marginBottom: 12}]}>
                                    Day and Month
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setyDay} 
                                    />
                                    
                                    <Text style={styles.divider}>/</Text>
                                    
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMonth}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.label, {marginBottom: 12}]}>
                                    Hour and Minute
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setHour}
                                    />
                                    
                                    <Text style={styles.divider}>:</Text>
                                    
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMinute}
                                    />
                                </View>
                            </View>
                        </View>
                        
                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>Description</Text>
                            <Text style={styles.charactersLimit}> Max 100 Characters</Text>
                        </View>

                        <TextArea 
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}
                        />

                        <View style={styles.footer}>
                            <Button 
                                title="Schedule"
                                onPress={handleSave}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Background>

            <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
                <Guilds handleGuildSelect={handleGuildSelect} />
            </ModalView>
        </KeyboardAvoidingView>
    );
}
