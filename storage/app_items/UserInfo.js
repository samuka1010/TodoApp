import { AsyncStorage } from 'react-native';

import { delayedAlert } from 'hpro-rn';

const USER_INFO_KEY = 'USERINFO';

// Por definição, sempre que campos de tabelas forem utilizados no projeto mobile
// eles serão referenciadas diretamente pelo seus nomes.
class UserInfo {
    constructor(nom, cod, raz, empcod, empraz) {
        this.nom = nom;
        this.cod = cod;
        this.raz = raz;
        this.empcod = empcod;
        this.empraz = empraz;
    }
}

export async function saveUserInfo(nom, cod, raz, empcod, empraz) {

    const userInfo = new UserInfo(nom, cod, raz, empcod, empraz);
    
    try {
        await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
    } catch (error) {
        delayedAlert('Erro', error.message);
    }
}

export async function loadUserInfo() {
    try {
        const userInfo = await AsyncStorage.getItem(USER_INFO_KEY);

        if (!userInfo) {
            return null;
        }

        return JSON.parse(userInfo);

    } catch (error) {
        delayedAlert('Erro', error.message);
    }
}

export async function clearUserInfo() {
    try {
        await AsyncStorage.removeItem(USER_INFO_KEY);
    } catch (error) {
        delayedAlert('Erro', error.message);
    }
}