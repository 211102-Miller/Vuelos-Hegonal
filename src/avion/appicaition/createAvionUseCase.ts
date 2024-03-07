import { v4 as uuid } from "uuid";
import { validate } from "class-validator";

import { Avion } from "../domina/avion";
import { ValidatorCreate } from "../domina/validation/avion";
import { AvionRepository } from "../domina/avionRepository";

export class CreateAvionUsecase{

    constructor(readonly avionRepository:AvionRepository){}

    async run(
       name :string,
       model : string,
       capacity: number,
       airline:string,
    ):Promise<Avion |null| string | Error>{

        const myuuid: string = uuid()
        let post = new ValidatorCreate(myuuid, name, model,capacity,airline);
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const createUser = await this.avionRepository.createAvion(
                myuuid,
                name,
                model,
                capacity,airline
            );

            return createUser;
        } catch (error) {
            return null;
        }
    }
}