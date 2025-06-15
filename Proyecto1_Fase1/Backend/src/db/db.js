import {createPool} from 'mysql2/promise'

export const pool = createPool({
    host: 'data_base',
    user: 'root',
    password: '123',
    database: 'SOPES1',
    port: '3306'
});

/* export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'SOPES1',
    port: '3306'
}); */

