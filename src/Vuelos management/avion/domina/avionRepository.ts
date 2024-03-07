import { Avion } from "./avion";

export interface AvionRepository{
    createAvion(
        uuid:string,
        name:string,
        model:string,
        capacity:number,
        airline:string
    ): Promise<Avion | null | string | Error>;

    getAllAvion():Promise<Avion[] | null>;

    getById(uuid:string):Promise<Avion | null>;

    updateAvion(uuid:string,capacity:number):Promise<Avion | null >;

    deleteAvion(uuid:string):Promise<string | null>;
}