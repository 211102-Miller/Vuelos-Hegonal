import { Avion } from "../domina/avion";
import { AvionRepository } from "../domina/avionRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domina/validation/avion";



export class GetByIdUseCase{
    constructor(readonly avionRepository:AvionRepository ){}

    async run(uuid:string):Promise<Avion | null>{

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getUserById = await this.avionRepository.getById(uuid);
            return getUserById;
        } catch (error) {
            return null
        }
    }
}