import { Vuelos } from "../domina/vuelos";
import { VuelosRepository } from "../domina/vuelosRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domina/validation/vuelos";

export class DeleteVuelosUseCase{

    constructor(readonly vuelosRepository: VuelosRepository){}

    async run(uuid:string):Promise<string | null>{

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const taske = await this.vuelosRepository.delete(uuid);
            return taske;
        } catch (error) {
            return null
        }
    }
}