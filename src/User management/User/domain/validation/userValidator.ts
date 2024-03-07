import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';


export class ValidatorRegisterUser {

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public name: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public lastName: string;

    @IsNotEmpty()
    @IsString()
    @Length(10) 
    public cellphone: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;


    constructor(
        name: string,
        lastName: string,
        cellphone: string,
        email: string,
        password: string,
    ) {
        this.name = name;
        this.lastName = lastName;
        this.cellphone = cellphone;
        this.email = email;
        this.password = password;
    }

}

export class ValidateLogin {

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    constructor(
        email: string,
        password: string
    ) {
        this.email = email;
        this.password = password;
    }

}

export class ValidatorUpdate {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    public name:string

    @IsNotEmpty()
    @IsString()
    public lastName:string

    @IsNotEmpty()
    @IsString()
    @Length(10) 
    public cellphone: string;

    constructor(uuid:string, name:string,lastName:string, cellphone:string) {
        this.uuid = uuid;
        this.name = name;
        this.lastName = lastName;
        this.cellphone = cellphone;
    }
}

export class ValidatorIdentificador {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    constructor(uuid:string) {
        this.uuid = uuid;
    }
}