import { AsyncStorage } from 'react-native';

import { delayedAlert } from 'hpro-rn';

const SYNC_INFO_KEY = 'SYNCINFO';

class SyncInfo {
    constructor(date, time) {
        this.date = date;
        this.time = time;
    }
}

export async function saveSyncInfo(date, time) {

    const syncInfo = new SyncInfo(date, time);
    
    try {
        await AsyncStorage.setItem(SYNC_INFO_KEY, JSON.stringify(syncInfo));
    } catch (error) {
        delayedAlert('Erro', error.message);
    }
}

export async function loadSyncInfo() {
    try {
        const syncInfo = await AsyncStorage.getItem(SYNC_INFO_KEY);

        if (!syncInfo) {
            return null;
        }

        return JSON.parse(syncInfo);

    } catch (error) {
        delayedAlert('Erro', error.message);
    }
}

export async function clearSyncInfo() {
    try {
        await AsyncStorage.removeItem(SYNC_INFO_KEY);
    } catch (error) {
        delayedAlert('Erro', error.message);
    }
}