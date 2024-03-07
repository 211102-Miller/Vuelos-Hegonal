import { Vuelos } from "./vuelos";

export interface VuelosRepository{
    create(
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
    ): Promise<Vuelos | null | string | Error>;

    getAll():Promise<Vuelos[] | null>;

    getById(uuid:string):Promise<Vuelos | null>;

    update(uuid:string,state:string):Promise<Vuelos | null >;

    delete(uuid:string):Promise<string | null>;
}