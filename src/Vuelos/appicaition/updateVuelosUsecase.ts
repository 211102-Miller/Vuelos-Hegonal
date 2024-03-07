import { Vuelos } from "../domina/vuelos";
import { VuelosRepository } from "../domina/vuelosRepository";
import { validate } from "class-validator";
import { ValidatorUpdate } from "../domina/validation/vuelos";

export class UpdateVuelosByIdUseCase{
    constructor(readonly vuelosRepository:VuelosRepository){}

    async update(
        uuid: string,
        state?: string,
        
       
        ): Promise<Vuelos | null> {

        let post = new ValidatorUpdate(uuid,state)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const updateById = await this.vuelosRepository.update(uuid,state);
            return updateById;
        } catch (error) {
            return null;
        }
    }
}