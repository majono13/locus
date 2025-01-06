import { UserTypeEnum } from "src/app/core/enums/user-type.enum";

export class User implements IUser {
    id?: string;
    createdAt: Date = new Date();
    active: boolean = true;
    name: string = "";
    password?: string;
    email: string = "";
    type: UserTypeEnum = UserTypeEnum.COMMUN
}

export interface IUser {
    id?: string;
    createdAt: Date;
    active: boolean;
    name: string;
    password?: string;
    email: string;
    type: UserTypeEnum;
}