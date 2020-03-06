import { Alert } from 'react-native';

export function applyMask(value, pattern) {

    let i = 0;
    let v = value.toString();
    
    return pattern.replace(/#/g, _ => v[i] ? v[i++] : '');
}

export function delayedAlert(title, message, buttons, options, type, delay = 510) {

    // Essa função é um workaround para o problema descrito na issue abaixo:
    // https://github.com/facebook/react-native/issues/10471

    setTimeout(() => {
        Alert.alert(title, message, buttons, options, type);
    }, delay);
}

export function formatCurrency(value, decimalPlaces = 2, thousandSeparator = '.', decimalSeparator = ',', currencySymbol = 'R$') {
    
    let tmp = parseFloat(value);

    if (isNaN(tmp)) {
        return value;
    }

    value = tmp;

    // Fix the value to desired decimal places
    let fixedValue = value.toFixed(decimalPlaces);

    // Split the thousand and decimal values
    fixedValue = fixedValue.split('.');

    // Split the thousand values in groups of 3 digits and join them by using the desired thousand separator
    fixedValue[0] = fixedValue[0].split(/(?=(?:...)*$)/).join(thousandSeparator);

    // Join the thousand and decimal values by using the desired decimal separator
    fixedValue = fixedValue.join(decimalSeparator);

    return `${currencySymbol ? `${currencySymbol} ` : ''}${value < 0 ? '-' : ''}${fixedValue}`;
}

export function getFormattedDate(date) {
    if (!date) {
        date = new Date();
    }

    let day = date.getDate().toString();
    day = (day.length < 2) ? `0${day}` : day;
    
    let month = (date.getMonth() + 1).toString();
    month = (month.length < 2) ? `0${month}` : month;
    
    let year = date.getFullYear().toString();

    return  `${day}/${month}/${year}`;
}

export function getFormattedTime(date) {
    if (!date) {
        date = new Date();
    }

    let hours = date.getHours().toString();
    hours = (hours.length < 2) ? `0${hours}` : hours;
    
    let minutes = date.getMinutes().toString();
    minutes = (minutes.length < 2) ? `0${minutes}` : minutes;
    
    let seconds = date.getSeconds().toString();
    seconds = (seconds.length < 2) ? `0${seconds}` : seconds;

    return  `${hours}:${minutes}:${seconds}`;    
}