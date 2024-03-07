import { Vuelos } from "../domina/vuelos";
import { VuelosRepository } from "../domina/vuelosRepository";
import { query } from "../../../database/postgresql";

export class PosgresVuelosRepository implements VuelosRepository {
    
    async create(
        uuid: string,
        origin: string,
        destination: string,
        state: string,
        city: string,
        date_init: Date,
        date_end: Date,
        price: number,
        status: string,
        avion_uuid: string
    ): Promise<Vuelos | null | string | Error> {
        try {
            const sql = "INSERT INTO Vuelos(uuid, origin, destination, state, city, date_init, date_end, price, status, avion_uuid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
            const params: any[] = [uuid, origin, destination, state, city, date_init, date_end, price, status, avion_uuid];

            console.log('Executing SQL:', sql);
            console.log('Parameters:', params);

            const result = await query(sql, params);
            console.log('Query Result:', result);

            return new Vuelos(uuid, origin, destination, state, city, date_init, date_end, price, status, avion_uuid);
        } catch (error) {
            console.error("Error adding vuelo:", error);
            return error as Error;
        }
    }

    async getAll(): Promise<Vuelos[]> {
        try {
            const sql = "SELECT * FROM Vuelos";
            const result = await query(sql);

            if (!result) {
                throw new Error('No result returned from the query');
            }

            const rows = result.rows;

            const vuelos: Vuelos[] = rows.map(row => new Vuelos(
                row.uuid,
                row.origin,
                row.destination,
                row.state,
                row.city,
                row.date_init,
                row.date_end,
                row.price,
                row.status,
                row.avion_uuid
            ));

            return vuelos;
        } catch (error) {
            console.error('Error fetching vuelos:', error);
            return [];
        }
    }
    async getById(uuid: string): Promise<Vuelos | null> {
        try {
            const sql = "SELECT * FROM Vuelos WHERE uuid = $1 LIMIT 1";
            const result = await query(sql, [uuid]);
            const rows = result.rows;
    
            if (!rows || rows.length === 0) return null;
    
            const row = rows[0];
            return new Vuelos(  row.uuid,
                row.origin,
                row.destination,
                row.state,
                row.city,
                row.date_init,
                row.date_end,
                row.price,
                row.status,
                row.avion_uuid);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
   

    async update(uuid: string, status: string): Promise<Vuelos | null> {
        try {
            const sql = "UPDATE Vuelos SET status = $1 WHERE uuid = $2";
            const result = await query(sql, [status, uuid]);

            if (result && result.rowCount === 0) {
                console.log('No vuelo found with the provided UUID.');
                return null;
            }

            const selectResult = await query('SELECT * FROM Vuelos WHERE uuid = $1', [uuid]);

            if (!selectResult) {
                throw new Error('No result returned from the SELECT query.');
            }

            const updatedRows = selectResult.rows || [];

            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No vuelo found with the provided UUID.');
            }

            const updatedVuelo = new Vuelos(
                updatedRows[0].uuid,
                updatedRows[0].origin,
                updatedRows[0].destination,
                updatedRows[0].state,
                updatedRows[0].city,
                updatedRows[0].date_init,
                updatedRows[0].date_end,
                updatedRows[0].price,
                updatedRows[0].status,
                updatedRows[0].avion_uuid
            );

            console.log('Vuelo updated successfully:', updatedVuelo);

            return updatedVuelo;
        } catch (error) {
            console.error('Error updating vuelo:', error);
            return null;
        }
    }

    async delete(uuid: string): Promise<string | null> {
        try {
            const sql = 'DELETE FROM Vuelos WHERE uuid = $1';
            const result: any = await query(sql, [uuid]);

            if (result && result.rowCount === 0) {
                console.log('No vuelo found with the provided UUID.');
                return null;
            }

            console.log('Vuelo deleted successfully.');
            return 'Vuelo deleted successfully.';
        } catch (error) {
            console.error('Error deleting vuelo:', error);
            return null;
        }
    }
}
