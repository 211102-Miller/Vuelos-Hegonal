import { Avion } from "../domina/avion";
import { AvionRepository } from "../domina/avionRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domina/validation/avion";

export class DeleteAvionUseCase {

    constructor(readonly avionRepository: AvionRepository) { }

    async run(uuid: string): Promise<string | null> {

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            console.log("Validation error:", validation);
            throw new Error("Validation error. See console for details.");
        }

        try {
            const taske = await this.avionRepository.deleteAvion(uuid);
            return taske;
        } catch (error) {
            return null
        }
    }
}