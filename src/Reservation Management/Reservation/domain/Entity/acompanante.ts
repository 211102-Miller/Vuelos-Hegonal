export class Acompanante{

    public uuidReservation:string;
    public uuidAsineto:string;
    public name:string;
    public lastName:string;
    public typeEquipaje:string;

    constructor( 
        uuidReservation:string,
        uuidAsiento:string,
        name:string, 
        lastName:string, 
        typeEquipaje:string 
        ){
            this.uuidReservation = uuidReservation;
            this.uuidAsineto = uuidAsiento;
            this.name = name;
            this.lastName = lastName;
            this.typeEquipaje = typeEquipaje;
        }

}