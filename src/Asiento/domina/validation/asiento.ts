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
    @IsIn(['premium', 'basico'])
    public type: string;

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsNotEmpty()
    @IsString()
    public avion_uuid: string;


    constructor(
        uuid: string,
        name: string,
        type: string,
        description:string,
        avion_uuid: string
    ) {
        this.uuid = uuid;
        this.name = name;
        this.type = type;
        this.description = description;
        this.avion_uuid = avion_uuid
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
    @IsIn(['premium', 'basico'])
    public type?: string;



 
    constructor( 
        uuid: string,
        type?: string,
       ) {
            
        this.uuid = uuid;
        this.type = type;
        
    }
}
