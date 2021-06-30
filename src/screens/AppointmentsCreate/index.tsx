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


import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { TextArea } from '../../components/TextArea';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect';


export function AppointmentsCreate() {
    const [category, setCategory] = useState('');

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView>
                <Background>
                    <Header title="Schedule match" />

                    <View style={styles.category}>
                        <Text style={styles.label}>Category</Text>
                    </View>

                    <CategorySelect 
                        hasCheckBox
                        categorySelected={category}
                        setCategory={setCategory}
                    />

                    <View style={styles.form}>
                        <RectButton>
                            <View style={styles.select}>
                                {
                                    // <View style={styles.image} />
                                    <GuildIcon />
                                }
                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        Select a guild
                                    </Text>
                                </View>

                                <Feather name="chevron-right" color={theme.colors.heading} size={18} />
                            </View>
                        </RectButton>
                        
                        <View style={styles.field}>
                            <View>
                                <Text style={styles.label}>Day and Month</Text>

                                <View style={styles.column}>
                                    <SmallInput maxLength={2} />
                                    <Text style={styles.divider}>/</Text>
                                    <SmallInput maxLength={2} />
                                </View>
                            </View>

                            <View>
                                <Text style={styles.label}>Hour and Minute</Text>

                                <View style={styles.column}>
                                    <SmallInput maxLength={2} />
                                    <Text style={styles.divider}>:</Text>
                                    <SmallInput maxLength={2} />
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
                        />

                        <View style={styles.footer}>
                            <Button title="Schedule"/>
                        </View>
                    </View>
                </Background>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
