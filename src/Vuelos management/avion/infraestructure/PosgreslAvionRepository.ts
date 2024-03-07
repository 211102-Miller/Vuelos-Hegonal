import { Avion } from "../domina/avion";
import { AvionRepository } from "../domina/avionRepository";
import { query } from "../../../database/postgresql";

export class PosgresAvionRepository implements AvionRepository {
    
    async createAvion(uuid: string, name: string, model: string, capacity: number, airline: string): Promise<string | Avion | Error> {
        try {
            const sql = "INSERT INTO avion(uuid, name, model, capacity, airline) VALUES ($1, $2, $3, $4, $5)";
            const params: any[] = [uuid, name, model, capacity, airline];

            console.log('Executing SQL:', sql);
            console.log('Parameters:', params);

            const result = await query(sql, params);
            console.log('Query Result:', result);

            return new Avion(uuid, name, model, capacity, airline);
        } catch (error) {
            console.error("Error adding avion:", error);
            return error as Error;
        }
    }

    async getAllAvion(): Promise<Avion[]> {
        try {
            const sql = "SELECT * FROM avion";
            const result = await query(sql);

            if (!result) {
                throw new Error('No result returned from the query');
            }

            const rows = result.rows;

            const aviones: Avion[] = rows.map(row => new Avion(
                row.uuid,
                row.name,
                row.model,
                row.capacity,
                row.airline
            ));

            return aviones;
        } catch (error) {
            console.error('Error fetching aviones:', error);
            return [];
        }
    }

    async getById(uuid: string): Promise<Avion | null> {
        try {
            const sql = "SELECT * FROM avion WHERE uuid = $1 LIMIT 1";
            const result = await query(sql, [uuid]);
            const rows = result.rows;
    
            if (!rows || rows.length === 0) return null;
    
            const row = rows[0];
            return new Avion(row.uuid, row.name, row.model, row.capacity, row.airline);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    

    async updateAvion(uuid: string, capacity: number): Promise<Avion | null> {
        try {
            const sql = "UPDATE avion SET capacity = $1 WHERE uuid = $2";
            const result = await query(sql, [capacity, uuid]);

            if (result && result.rowCount === 0) {
                console.log('No avion found with the provided UUID.');
                return null;
            }

            const selectResult = await query('SELECT * FROM Avion WHERE uuid = $1', [uuid]);

            if (!selectResult) {
                throw new Error('No result returned from the SELECT query.');
            }

            const updatedRows = selectResult.rows || [];

            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No avion found with the provided UUID.');
            }

            const updatedAvion = new Avion(
                updatedRows[0].uuid,
                updatedRows[0].name,
                updatedRows[0].model,
                updatedRows[0].capacity,
                updatedRows[0].airline
            );

            console.log('Avion updated successfully:', updatedAvion);

            return updatedAvion;
        } catch (error) {
            console.error('Error updating avion:', error);
            return null;
        }
    }

    async deleteAvion(uuid: string): Promise<string | null> {
        try {
            const sql = 'DELETE FROM avion WHERE uuid = $1';
            const result: any = await query(sql, [uuid]);

            if (result && result.rowCount === 0) {
                console.log('No avion found with the provided UUID.');
                return null;
            }

            console.log('Avion deleted successfully.');
            return 'Avion deleted successfully.';
        } catch (error) {
            console.error('Error deleting avion:', error);
            return null;
        }
    }
}
