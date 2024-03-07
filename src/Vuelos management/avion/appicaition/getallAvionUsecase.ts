import { Avion } from "../domina/avion";
import { AvionRepository } from "../domina/avionRepository";

export class GetAllAvionUseCase{
    constructor(readonly avionRepository: AvionRepository){}


    async run():Promise<Avion[] | null>{
        try {
            const listTaskes = await this.avionRepository.getAllAvion();
            return listTaskes; 
        } catch (error) {
            return null; 
        }
    }
}