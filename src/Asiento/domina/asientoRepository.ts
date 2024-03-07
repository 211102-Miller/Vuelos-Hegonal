import { Asiento } from "./asiento";

export interface AsientoRepository{
    create(
        uuid:string,
        name:string,
        type:string,
        description:string,
        avion_uuid:string
    ): Promise<Asiento | null | string | Error>;

    getAll():Promise<Asiento[] | null>;

    getById(uuid:string):Promise<Asiento | null>;

    update(uuid:string,type:string):Promise<Asiento | null >;

    delete(uuid:string):Promise<string | null>;
}