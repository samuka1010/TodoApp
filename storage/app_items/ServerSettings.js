import { AsyncStorage } from 'react-native';

import { delayedAlert } from 'hpro-rn';

const SERVER_SETTINGS_KEY = 'SERVERSETTINGS';

class ServerSettings {
    constructor(IPAddress, port) {
        this.IPAddress = IPAddress;
        this.port = port;
    }
}

export async function saveServerSettings(IPAddress, port) {

    const serverSettings = new ServerSettings(IPAddress, port);
    
    try {
        await AsyncStorage.setItem(SERVER_SETTINGS_KEY, JSON.stringify(serverSettings));
    } catch (error) {
        delayedAlert('Erro', error.message);
    }
}

export async function loadServerSettings() {
    try {
        const serverSettings = await AsyncStorage.getItem(SERVER_SETTINGS_KEY);

        if (!serverSettings) {
            return null;
        }

        return JSON.parse(serverSettings);

    } catch (error) {
        delayedAlert('Erro', error.message);
    }
}

export async function clearServerSettings() {
    try {
        await AsyncStorage.removeItem(SERVER_SETTINGS_KEYS);
    } catch (error) {
        delayedAlert('Erro', error.message);
    }
}