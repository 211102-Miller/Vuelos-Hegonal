import {  Vuelos } from "../domina/vuelos";
import { VuelosRepository } from "../domina/vuelosRepository";

export class GetAllVuelosUseCase{
    constructor(readonly vuelosRepository: VuelosRepository){}


    async run():Promise<Vuelos[] | null>{
        try {
            const listTaskes = await this.vuelosRepository.getAll();
            return listTaskes; 
        } catch (error) {
            return null; 
        }
    }
}