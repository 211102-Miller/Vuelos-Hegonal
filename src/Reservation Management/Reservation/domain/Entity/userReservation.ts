export class UserReservation{
    public uuidUser:string;
    public uuidAsiento:string;
    public uuidVueloIda:string;
    public uuidVueloRegreso:string;
    public typeVuelo:string;
    public typeEquipaje:string

    constructor(
        uuidUser:string,
        uuidAsiento:string,
        uuidVueloIda:string,
        uuidVueloRegreso:string,
        typeVuelo:string,
        typeEquipaje:string
        ){
        this.uuidUser = uuidUser;
        this.uuidAsiento = uuidAsiento;
        this.uuidVueloIda =uuidVueloIda;
        this.uuidVueloRegreso = uuidVueloRegreso;
        this.typeVuelo = typeVuelo;
        this.typeEquipaje = typeEquipaje;
    }
}