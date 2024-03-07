import { Asiento } from "../domina/asiento";
import { AsientoRepository } from "../domina/asientoRepository";
import { query } from "../../database/mysql";

export class PosgresAsientoRepository implements AsientoRepository {
    
    async create(uuid: string, name: string, type: string, description: string, avion_uuid: string): Promise<string | Asiento | Error> {
        try {
            const sql = "INSERT INTO Asiento(uuid, name, type, description, avion_uuid) VALUES ($1, $2, $3, $4, $5)";
            const params: any[] = [uuid, name, type, description, avion_uuid];

            console.log('Executing SQL:', sql);
            console.log('Parameters:', params);

            const result = await query(sql, params);
            console.log('Query Result:', result);

            return new Asiento(uuid, name, type, description, avion_uuid);
        } catch (error) {
            console.error("Error adding avion:", error);
            return error as Error;
        }
    }

    async getAll(): Promise<Asiento[]> {
        try {
            const sql = "SELECT * FROM Asiento";
            const result = await query(sql);

            if (!result) {
                throw new Error('No result returned from the query');
            }

            const rows = result.rows;

            const aviones: Asiento[] = rows.map(row => new Asiento(
                row.uuid,
                row.name,
                row.type,
                row.description,
                row.avion_uuid
            ));

            return aviones;
        } catch (error) {
            console.error('Error fetching aviones:', error);
            return [];
        }
    }

    async getById(uuid: string): Promise<Asiento | null> {
        try {
            const sql = "SELECT * FROM Asiento WHERE uuid = $1 LIMIT 1";
            const result = await query(sql, [uuid]);
            const rows = result.rows;
    
            if (!rows || rows.length === 0) return null;
    
            const row = rows[0];
            return new Asiento(row.uuid, row.name, row.type, row.description, row.avion_uuid);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async update(uuid: string, type: string): Promise<Asiento | null> {
        try {
            const sql = "UPDATE Asiento SET type = $1 WHERE uuid = $2";
            const result = await query(sql, [type, uuid]);

            if (result && result.rowCount === 0) {
                console.log('No found with the provided UUID.');
                return null;
            }

            const selectResult = await query('SELECT * FROM Asiento WHERE uuid = $1', [uuid]);

            if (!selectResult) {
                throw new Error('No result returned from the SELECT query.');
            }

            const updatedRows = selectResult.rows || [];

            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No  found with the provided UUID.');
            }

            const updatedAvion = new Asiento(
                updatedRows[0].uuid,
                updatedRows[0].name,
                updatedRows[0].type,
                updatedRows[0].description,
                updatedRows[0].avion_uuid
            );

            console.log('Avion updated successfully:', updatedAvion);

            return updatedAvion;
        } catch (error) {
            console.error('Error updating avion:', error);
            return null;
        }
    }

    async delete(uuid: string): Promise<string | null> {
        try {
            const sql = 'DELETE FROM Asiento WHERE uuid = $1';
            const result: any = await query(sql, [uuid]);

            if (result && result.rowCount === 0) {
                console.log('No  found with the provided UUID.');
                return null;
            }

            console.log(' deleted successfully.');
            return ' deleted successfully.';
        } catch (error) {
            console.error('Error deleting :', error);
            return null;
        }
    }
}
