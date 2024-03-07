import { Pool, PoolConfig } from "pg";
import { Signale } from "signale";
import dotenv from "dotenv";

const signale = new Signale();

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const config: PoolConfig = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORTDATABASE), // Convertir a número
    max: parseInt(process.env.MAX_CONNECTIONS), // Convertir a número
};

// Crear el pool de conexiones
const pool = new Pool(config);

export async function query(sql: string, params?: any[]) {
    try {
        const client = await pool.connect();
        signale.success("Conexión exitosa a la BD");

        // Utiliza el método query del cliente para ejecutar consultas
        const result = await client.query(sql, params);

        // Libera el cliente de vuelta al pool
        client.release();

        return result;
    } catch (error) {
        signale.error(error);
        return null;
    }
}
