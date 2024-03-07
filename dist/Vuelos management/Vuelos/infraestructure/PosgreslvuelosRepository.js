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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosgresVuelosRepository = void 0;
const vuelos_1 = require("../domina/vuelos");
const postgresql_1 = require("../../../database/postgresql");
class PosgresVuelosRepository {
    create(uuid, origin, destination, state, city, date_init, date_end, price, status, avion_uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "INSERT INTO Vuelos(uuid, origin, destination, state, city, date_init, date_end, price, status, avion_uuid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
                const params = [uuid, origin, destination, state, city, date_init, date_end, price, status, avion_uuid];
                console.log('Executing SQL:', sql);
                console.log('Parameters:', params);
                const result = yield (0, postgresql_1.query)(sql, params);
                console.log('Query Result:', result);
                return new vuelos_1.Vuelos(uuid, origin, destination, state, city, date_init, date_end, price, status, avion_uuid);
            }
            catch (error) {
                console.error("Error adding vuelo:", error);
                return error;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM Vuelos";
                const result = yield (0, postgresql_1.query)(sql);
                if (!result) {
                    throw new Error('No result returned from the query');
                }
                const rows = result.rows;
                const vuelos = rows.map(row => new vuelos_1.Vuelos(row.uuid, row.origin, row.destination, row.state, row.city, row.date_init, row.date_end, row.price, row.status, row.avion_uuid));
                return vuelos;
            }
            catch (error) {
                console.error('Error fetching vuelos:', error);
                return [];
            }
        });
    }
    getById(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM Vuelos WHERE uuid = $1 LIMIT 1";
                const result = yield (0, postgresql_1.query)(sql, [uuid]);
                const rows = result.rows;
                if (!rows || rows.length === 0)
                    return null;
                const row = rows[0];
                return new vuelos_1.Vuelos(row.uuid, row.origin, row.destination, row.state, row.city, row.date_init, row.date_end, row.price, row.status, row.avion_uuid);
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    update(uuid, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "UPDATE Vuelos SET status = $1 WHERE uuid = $2";
                const result = yield (0, postgresql_1.query)(sql, [status, uuid]);
                if (result && result.rowCount === 0) {
                    console.log('No vuelo found with the provided UUID.');
                    return null;
                }
                const selectResult = yield (0, postgresql_1.query)('SELECT * FROM Vuelos WHERE uuid = $1', [uuid]);
                if (!selectResult) {
                    throw new Error('No result returned from the SELECT query.');
                }
                const updatedRows = selectResult.rows || [];
                if (!updatedRows || updatedRows.length === 0) {
                    throw new Error('No vuelo found with the provided UUID.');
                }
                const updatedVuelo = new vuelos_1.Vuelos(updatedRows[0].uuid, updatedRows[0].origin, updatedRows[0].destination, updatedRows[0].state, updatedRows[0].city, updatedRows[0].date_init, updatedRows[0].date_end, updatedRows[0].price, updatedRows[0].status, updatedRows[0].avion_uuid);
                console.log('Vuelo updated successfully:', updatedVuelo);
                return updatedVuelo;
            }
            catch (error) {
                console.error('Error updating vuelo:', error);
                return null;
            }
        });
    }
    delete(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM Vuelos WHERE uuid = $1';
                const result = yield (0, postgresql_1.query)(sql, [uuid]);
                if (result && result.rowCount === 0) {
                    console.log('No vuelo found with the provided UUID.');
                    return null;
                }
                console.log('Vuelo deleted successfully.');
                return 'Vuelo deleted successfully.';
            }
            catch (error) {
                console.error('Error deleting vuelo:', error);
                return null;
            }
        });
    }
}
exports.PosgresVuelosRepository = PosgresVuelosRepository;
