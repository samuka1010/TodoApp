import { SQLite } from 'expo-sqlite';

const databases = {};

function openDatabase(databaseName = 'hpro') {

    let database = databases[databaseName];

    if (!database) {
        database = SQLite.openDatabase(`${databaseName}.db`);
        databases[databaseName] = database;
    }

    return database;
}

/*
Essa função deve ser utilizada para se obter facilmente resultado de queries. 
NÃO utilizar dentro do contexto da chamada transactionAsync().
*/
async function executeSqlAsync(sqlStatement, args = [], databaseName = 'hpro') {

    if (!sqlStatement) {
        throw new Error('É obrigatório informar uma expressão SQL.');
    }

    const database = openDatabase(databaseName);

    return new Promise((resolve, reject) => {
        database.transaction(transaction =>
            transaction.executeSql(
                sqlStatement,
                args,
                (transaction, resultSet) => resolve(resultSet),
                (transaction, error) => reject(error)
            )
        );
    });
}

/*
As chamadas SQL dentro da transactionAsync() devem ser executadas usando 
a API do SQLite. Ou seja, utilizar a referência 'transaction' que é passada como 
argumento para 'callback' para realizar as chamadas transaction.executeSql().

NÃO deve ser utilizada a função executeSqlAsync() desse wrapper uma vez que ela
não executará dentro da transação corrente.

Foi decidido por não construir uma chamada que aceitaria a execução da 
executeSqlAsync() pela verbosidade excessiva e por forçar a utilização 
do Promise.all([]) para a execução dd executeSqlAsync() dentro do contexto da 
transactionAsync().
*/
async function transactionAsync(callback, databaseName = 'hpro') {

    const database = openDatabase(databaseName);

    return new Promise((resolve, reject) => {
        database.transaction(transaction =>
            callback(transaction),
            error => reject(error),
            () => resolve()
        )
    });
}

export default {
    executeSqlAsync,
    transactionAsync,
}
