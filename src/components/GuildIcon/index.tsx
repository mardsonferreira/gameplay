import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

import DiscordImg from '../../assets/discord.png';


export function GuildIcon() {
   
    return (
        <Image  
            style={styles.image}
            source={DiscordImg}
            resizeMode="cover"
        />
    );
}