import { Vuelos } from "../domina/vuelos";
import { VuelosRepository } from "../domina/vuelosRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domina/validation/vuelos";



export class GetByIdUseCase{
    constructor(readonly vuelosRepository:VuelosRepository ){}

    async run(uuid:string):Promise<Vuelos | null>{

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getById = await this.vuelosRepository.getById(uuid);
            return getById;
        } catch (error) {
            return null
        }
    }
}