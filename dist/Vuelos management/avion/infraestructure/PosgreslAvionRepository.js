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
exports.PosgresAvionRepository = void 0;
const avion_1 = require("../domina/avion");
const postgresql_1 = require("../../../database/postgresql");
class PosgresAvionRepository {
    createAvion(uuid, name, model, capacity, airline) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "INSERT INTO avion(uuid, name, model, capacity, airline) VALUES ($1, $2, $3, $4, $5)";
                const params = [uuid, name, model, capacity, airline];
                console.log('Executing SQL:', sql);
                console.log('Parameters:', params);
                const result = yield (0, postgresql_1.query)(sql, params);
                console.log('Query Result:', result);
                return new avion_1.Avion(uuid, name, model, capacity, airline);
            }
            catch (error) {
                console.error("Error adding avion:", error);
                return error;
            }
        });
    }
    getAllAvion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM avion";
                const result = yield (0, postgresql_1.query)(sql);
                if (!result) {
                    throw new Error('No result returned from the query');
                }
                const rows = result.rows;
                const aviones = rows.map(row => new avion_1.Avion(row.uuid, row.name, row.model, row.capacity, row.airline));
                return aviones;
            }
            catch (error) {
                console.error('Error fetching aviones:', error);
                return [];
            }
        });
    }
    getById(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM avion WHERE uuid = $1 LIMIT 1";
                const result = yield (0, postgresql_1.query)(sql, [uuid]);
                const rows = result.rows;
                if (!rows || rows.length === 0)
                    return null;
                const row = rows[0];
                return new avion_1.Avion(row.uuid, row.name, row.model, row.capacity, row.airline);
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    updateAvion(uuid, capacity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "UPDATE avion SET capacity = $1 WHERE uuid = $2";
                const result = yield (0, postgresql_1.query)(sql, [capacity, uuid]);
                if (result && result.rowCount === 0) {
                    console.log('No avion found with the provided UUID.');
                    return null;
                }
                const selectResult = yield (0, postgresql_1.query)('SELECT * FROM Avion WHERE uuid = $1', [uuid]);
                if (!selectResult) {
                    throw new Error('No result returned from the SELECT query.');
                }
                const updatedRows = selectResult.rows || [];
                if (!updatedRows || updatedRows.length === 0) {
                    throw new Error('No avion found with the provided UUID.');
                }
                const updatedAvion = new avion_1.Avion(updatedRows[0].uuid, updatedRows[0].name, updatedRows[0].model, updatedRows[0].capacity, updatedRows[0].airline);
                console.log('Avion updated successfully:', updatedAvion);
                return updatedAvion;
            }
            catch (error) {
                console.error('Error updating avion:', error);
                return null;
            }
        });
    }
    deleteAvion(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM avion WHERE uuid = $1';
                const result = yield (0, postgresql_1.query)(sql, [uuid]);
                if (result && result.rowCount === 0) {
                    console.log('No avion found with the provided UUID.');
                    return null;
                }
                console.log('Avion deleted successfully.');
                return 'Avion deleted successfully.';
            }
            catch (error) {
                console.error('Error deleting avion:', error);
                return null;
            }
        });
    }
}
exports.PosgresAvionRepository = PosgresAvionRepository;
