"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const pg_1 = require("pg");
const signale_1 = require("signale");
const dotenv_1 = __importDefault(require("dotenv"));
const signale = new signale_1.Signale();
// Cargar variables de entorno desde el archivo .env
dotenv_1.default.config();
const config = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORTDATABASE), // Convertir a número
    max: parseInt(process.env.MAX_CONNECTIONS), // Convertir a número
};
// Crear el pool de conexiones
const pool = new pg_1.Pool(config);
function query(sql, params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield pool.connect();
            signale.success("Conexión exitosa a la BD");
            // Utiliza el método query del cliente para ejecutar consultas
            const result = yield client.query(sql, params);
            // Libera el cliente de vuelta al pool
            client.release();
            return result;
        }
        catch (error) {
            signale.error(error);
            return null;
        }
    });
}
exports.query = query;
