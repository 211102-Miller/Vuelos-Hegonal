import { v4 as uuid } from "uuid";
import { validate } from "class-validator";

import { Asiento } from "../domina/asiento";
import { ValidatorCreate } from "../domina/validation/asiento";
import { AsientoRepository } from "../domina/asientoRepository";

export class CreateAsientoUsecase{

    constructor(readonly avionRepository:AsientoRepository){}

    async run(
       name :string,
       type : string,
       description: string,
       avion_uuid:string,
    ):Promise<Asiento |null| string | Error>{

        const myuuid: string = uuid()
        let post = new ValidatorCreate(myuuid, name, type,description,avion_uuid);
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const create = await this.avionRepository.create(
                myuuid,
                name,
                type,
                description,avion_uuid
            );

            return create;
        } catch (error) {
            return null;
        }
    }
}