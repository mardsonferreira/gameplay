import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from '../Avatar';

import { styles } from './styles';

export function Profile() {
    return (
        <View style={styles.container}>
            <Avatar urlImage="https://github.com/mardsonferreira.png" />
            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Hello,
                    </Text>

                    <Text style={styles.username}>
                        Mardson
                    </Text>
                </View>

                <Text style={styles.message}>
                    Today is winning day
                </Text>
            </View>
        </View>
    );
}