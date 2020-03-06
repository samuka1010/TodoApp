 let _serverIPAddress = '';

function setServerIPAddress(IPAddress, port = '80') {
    if (IPAddress) {
        _serverIPAddress = `${IPAddress}:${port}`;
    } else {
        _serverIPAddress = '';
    }
}

async function process(processID, parameters = {}, callback) {

    if (!_serverIPAddress) {
        throw new Error('O endereço do IP do servidor não está configurado.');
    }

    parameters.process = processID;

    const queryString = Object.keys(parameters).map(key => `${key}=${parameters[key]}`).join('&');

    try {
        const response = await fetch(`http://${_serverIPAddress}/.process`, { method: 'POST', body: queryString });

        return unescape(await response.text());

    } catch (error) {
        throw new Error(error);
    }
}

export default {
    process,
    setServerIPAddress,
}
