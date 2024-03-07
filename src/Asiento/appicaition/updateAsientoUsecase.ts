import { Asiento } from "../domina/asiento";
import { AsientoRepository } from "../domina/asientoRepository";
import { validate } from "class-validator";
import { ValidatorUpdate } from "../domina/validation/asiento";

export class UpdateAsientoByIdUseCase{
    constructor(readonly asientoRepository:AsientoRepository){}

    async update(
        uuid: string,
        type?: string,
        
       
        ): Promise<Asiento | null> {

        let post = new ValidatorUpdate(uuid,type)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const updateById = await this.asientoRepository.update(uuid,type);
            return updateById;
        } catch (error) {
            return null;
        }
    }
}