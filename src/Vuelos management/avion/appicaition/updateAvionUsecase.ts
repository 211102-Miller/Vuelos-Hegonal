import { Avion } from "../domina/avion";
import { AvionRepository } from "../domina/avionRepository";
import { validate } from "class-validator";
import { ValidatorUpdate } from "../domina/validation/avion";

export class UpdateAvionByIdUseCase{
    constructor(readonly avionRepository:AvionRepository){}

    async update(
        uuid: string,
        capacity?: number,
        
       
        ): Promise<Avion | null> {

        let post = new ValidatorUpdate(uuid,capacity)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const updateUserById = await this.avionRepository.updateAvion(uuid,capacity);
            return updateUserById;
        } catch (error) {
            return null;
        }
    }
}