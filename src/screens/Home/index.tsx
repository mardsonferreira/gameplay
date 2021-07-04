import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';

import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { CategorySelect } from '../../components/CategorySelect';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { Load } from '../../components/Load';

export function Home() {
    const [category, setCategory] = useState('');
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
    const [loading, setLoading] = useState(true);
    
    const navigation = useNavigation();

    function handleCategorySelected(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentsDetails(guildSelected: AppointmentProps) {
        navigation.navigate('AppointmentsDetails', { guildSelected });
    }

    function handleAppointmentsCreate() {
        navigation.navigate('AppointmentsCreate');
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if (category) {
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage);
        }

        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments()
    }, [category]));

    return (
        <Background>
            <View style={styles.header}>
                <Profile/>
                <ButtonAdd onPress={handleAppointmentsCreate}/>
            </View>

            
            <CategorySelect  
                categorySelected={category}
                setCategory={handleCategorySelected}
            />

            
            {
                loading ? <Load /> :
                <>
                    <ListHeader title="Scheduled games" subtitle={`Total ${appointments.length}`} />

                    <FlatList
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <Appointment data={item} onPress={() => handleAppointmentsDetails(item)} />
                        )}
                        ItemSeparatorComponent={() => <ListDivider />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 69 }}
                        style={styles.matches}
                    />
                </>
            }
        </Background>
    );
}