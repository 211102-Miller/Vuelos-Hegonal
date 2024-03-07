import { Asiento } from "../domina/asiento";
import { AsientoRepository } from "../domina/asientoRepository";

export class GetAllAsientoUseCase{
    constructor(readonly asientoRepository: AsientoRepository){}


    async run():Promise<Asiento[] | null>{
        try {
            const listTaskes = await this.asientoRepository.getAll();
            return listTaskes; 
        } catch (error) {
            return null; 
        }
    }
}