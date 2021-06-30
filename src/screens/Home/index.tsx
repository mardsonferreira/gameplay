import React, { useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { Appointment } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { CategorySelect } from '../../components/CategorySelect';

export function Home() {
    const [category, setCategory] = useState('');
    const navigation = useNavigation();

    const appointments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: 'null',
                owner: true
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: 'É hoje que vamos chegarao challenger sem perder uma partida da m10'
        },
        {
            id: '2',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: 'null',
                owner: true
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: 'É hoje que vamos chegarao challenger sem perder uma partida da m10'
        }
    ]

    function handleCategorySelected(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentsDetails() {
        navigation.navigate('AppointmentsDetails');
    }

    return (
        <Background>
            <View style={styles.header}>
                <Profile/>
                <ButtonAdd />
            </View>

            
            <CategorySelect  
                categorySelected={category}
                setCategory={handleCategorySelected}
            />

            <View style={styles.content}>
                <ListHeader title="Scheduled games" subtitle="Total 6" />

                <FlatList
                    data={appointments}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <Appointment data={item} onPress={handleAppointmentsDetails} />
                    )}
                    ItemSeparatorComponent={() => <ListDivider />}
                    showsVerticalScrollIndicator={false}
                    style={styles.matches}
                />
            </View>
        </Background>
    );
}