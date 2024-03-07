export class Acompanante{

    public uuidAsiento:string;
    public name:string;
    public lastName:string;
    public typeEquipaje:string;

    constructor( 
        uuidAsiento:string,
        name:string, 
        lastName:string, 
        typeEquipaje:string 
        ){
            this.uuidAsiento = uuidAsiento;
            this.name = name;
            this.lastName = lastName;
            this.typeEquipaje = typeEquipaje;
        }

}