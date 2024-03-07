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
exports.PosgresAsientoRepository = void 0;
const asiento_1 = require("../domina/asiento");
const postgresql_1 = require("../../../database/postgresql");
class PosgresAsientoRepository {
    create(uuid, name, type, description, avion_uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "INSERT INTO Asiento(uuid, name, type, description, avion_uuid) VALUES ($1, $2, $3, $4, $5)";
                const params = [uuid, name, type, description, avion_uuid];
                console.log('Executing SQL:', sql);
                console.log('Parameters:', params);
                const result = yield (0, postgresql_1.query)(sql, params);
                console.log('Query Result:', result);
                return new asiento_1.Asiento(uuid, name, type, description, avion_uuid);
            }
            catch (error) {
                console.error("Error adding avion:", error);
                return error;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM Asiento";
                const result = yield (0, postgresql_1.query)(sql);
                if (!result) {
                    throw new Error('No result returned from the query');
                }
                const rows = result.rows;
                const aviones = rows.map(row => new asiento_1.Asiento(row.uuid, row.name, row.type, row.description, row.avion_uuid));
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
                const sql = "SELECT * FROM Asiento WHERE uuid = $1 LIMIT 1";
                const result = yield (0, postgresql_1.query)(sql, [uuid]);
                const rows = result.rows;
                if (!rows || rows.length === 0)
                    return null;
                const row = rows[0];
                return new asiento_1.Asiento(row.uuid, row.name, row.type, row.description, row.avion_uuid);
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    update(uuid, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "UPDATE Asiento SET type = $1 WHERE uuid = $2";
                const result = yield (0, postgresql_1.query)(sql, [type, uuid]);
                if (result && result.rowCount === 0) {
                    console.log('No found with the provided UUID.');
                    return null;
                }
                const selectResult = yield (0, postgresql_1.query)('SELECT * FROM Asiento WHERE uuid = $1', [uuid]);
                if (!selectResult) {
                    throw new Error('No result returned from the SELECT query.');
                }
                const updatedRows = selectResult.rows || [];
                if (!updatedRows || updatedRows.length === 0) {
                    throw new Error('No  found with the provided UUID.');
                }
                const updatedAvion = new asiento_1.Asiento(updatedRows[0].uuid, updatedRows[0].name, updatedRows[0].type, updatedRows[0].description, updatedRows[0].avion_uuid);
                console.log('Avion updated successfully:', updatedAvion);
                return updatedAvion;
            }
            catch (error) {
                console.error('Error updating avion:', error);
                return null;
            }
        });
    }
    delete(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM Asiento WHERE uuid = $1';
                const result = yield (0, postgresql_1.query)(sql, [uuid]);
                if (result && result.rowCount === 0) {
                    console.log('No  found with the provided UUID.');
                    return null;
                }
                console.log(' deleted successfully.');
                return ' deleted successfully.';
            }
            catch (error) {
                console.error('Error deleting :', error);
                return null;
            }
        });
    }
}
exports.PosgresAsientoRepository = PosgresAsientoRepository;
