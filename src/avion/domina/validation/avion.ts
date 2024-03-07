import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail, IsNumber} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import 'reflect-metadata';


export class ValidatorCreate {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public name: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public model: string;

    @IsNotEmpty()
    @IsNumber()
    public capacity: number;

    @IsNotEmpty()
    @IsString()
    public airline: string;


    constructor(
        uuid: string,
        name: string,
        model: string,
        capacity:number,
        airline: string
    ) {
        this.uuid = uuid;
        this.name = name;
        this.model = model;
        this.capacity = capacity;
        this.airline = airline
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
    @IsNumber()
    @Length(1, 100)
    public capacity?: number;



 
    constructor( 
        uuid: string,
        capacity?: number,
       ) {
            
        this.uuid = uuid;
        this.capacity = capacity;
        
    }
}
