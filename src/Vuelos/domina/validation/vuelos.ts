import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail, IsNumber} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import 'reflect-metadata';



export class ValidatorCreate {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    public origin: string;

    @IsNotEmpty()
    @IsString()
    public destination: string;

    @IsNotEmpty()
    @IsString()
    public state: string;

    @IsNotEmpty()
    @IsString()
    public city: string;

    @IsNotEmpty()
    @Transform((value: TransformFnParams) => value.value ? new Date(value.value) : null, { toClassOnly: true })

    public date_init: Date| null;

    @IsNotEmpty()
    @Transform((value: TransformFnParams) => value.value ? new Date(value.value) : null, { toClassOnly: true })
    public date_end: Date| null;

    @IsNotEmpty()
    @IsNumber()
    public price: number;

    @IsNotEmpty()
    @IsString()
    @IsIn(["lleno","en vuelo", "finalizado","abordando"])
    public status: string;

    @IsNotEmpty()
    @IsString()
    public avion_uuid: string;

    constructor(
        uuid: string,
        origin: string,
        destination: string,
        state: string,
        city: string,
        date_init: Date,
        date_end: Date,
        price: number,
        status: string,
        avion_uuid: string
    ) {
        this.uuid = uuid;
        this.origin = origin;
        this.destination = destination;
        this.state = state;
        this.city = city;
        this.date_init = date_init;
        this.date_end = date_end;
        this.price = price;
        this.status = status;
        this.avion_uuid = avion_uuid;
    }
}



export class ValidatorId {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;
    constructor(uuid:string) {
        this.uuid = uuid
    }
}

export class ValidatorUpdate {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    @IsIn(["lleno","en vuelo", "finalizado","abordando"])
    public type?: string;



 
    constructor( 
        uuid: string,
        type?: string,
       ) {
            
        this.uuid = uuid;
        this.type = type;
        
    }
}
