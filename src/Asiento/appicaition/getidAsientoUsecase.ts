import { Asiento } from "../domina/asiento";
import { AsientoRepository } from "../domina/asientoRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domina/validation/asiento";



export class GetByIdUseCase{
    constructor(readonly asientoRepository:AsientoRepository ){}

    async run(uuid:string):Promise<Asiento | null>{

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getById = await this.asientoRepository.getById(uuid);
            return getById;
        } catch (error) {
            return null
        }
    }
}