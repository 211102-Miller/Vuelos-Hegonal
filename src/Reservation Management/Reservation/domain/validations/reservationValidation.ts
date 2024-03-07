import { IsString, IsUUID, IsNotEmpty, IsIn } from 'class-validator';

export class ValidatorCreate {

    @IsNotEmpty()
    @IsUUID()
    public uuidUser: string;

    @IsNotEmpty()
    @IsUUID()
    public uuidAsiento: string;

    @IsNotEmpty()
    @IsUUID()
    public uuidVueloIda: string;

    @IsUUID()
    public uuidVueloRegreso: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(['Redondo', 'Ida'])
    public typeVuelo: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(['Basico', 'Medium', 'Premium'])
    public typeEquipaje: string;

    constructor(
        uuidUser: string,
        uuidAsiento: string,
        uuidVueloIda: string,
        uuidVueloRegreso: string,
        typeVuelo: string,
        typeEquipaje: string
    ) {
        this.uuidUser = uuidUser;
        this.uuidAsiento = uuidAsiento;
        this.uuidVueloIda = uuidVueloIda;
        this.uuidVueloRegreso=uuidVueloRegreso;
        this.typeVuelo = typeVuelo;
        this.typeEquipaje = typeEquipaje;
    }
}
