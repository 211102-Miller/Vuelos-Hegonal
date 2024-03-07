import { v4 as uuid } from "uuid";
import { validate } from "class-validator";

import { Vuelos } from "../domina/vuelos";
import { ValidatorCreate } from "../domina/validation/vuelos";
import { VuelosRepository } from "../domina/vuelosRepository";

export class CreateVuelosUsecase{

    constructor(readonly vuelosRepository:VuelosRepository){}

    async run(
        origin :string,
        destination : string,
        state: string,
        city:string,
        date_init:Date,
        date_end:Date,
        price:number,
        status:string,
        avion_uuid:string
    ):Promise<ValidatorCreate |null| string | Error>{

        const myuuid: string = uuid()
        let post = new ValidatorCreate(myuuid, origin, destination,state,city,date_init,date_end,price,status,avion_uuid);
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const create = await this.vuelosRepository.create(
                myuuid,
                origin,
                destination,
                state,city,date_init,date_end,price,status,avion_uuid
            );

            return create;
        } catch (error) {
            return null;
        }
    }
}