export class Vuelos {
    constructor(
        public uuid: string,
        public origin: string,
        public destination: string,
        public state: string,
        public city: string,
        public date_init: Date,
        public date_end: Date,
        public price: number,
        public status: string,
        public avion_uuid: string
    ) {}
}
