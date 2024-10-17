import { IsString } from "class-validator";

export  class authResponse {

    @IsString()
    id: string;
}