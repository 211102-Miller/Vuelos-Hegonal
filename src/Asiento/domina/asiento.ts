export class Asiento{
    constructor(
        public uuid: string,
        public name: string,
        public type: string,
        public description: string,
        public avion_uuid: string
    ){}
}