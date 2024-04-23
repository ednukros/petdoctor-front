
export interface Employee {
    id?: number;
    name?: string;
    speciality?: string;
    phoneNumber?: number;
    email?: string;
    userName?: string,
    password: string;
    image?:string;
    role?:string;
}

export interface IUserDB {
    token:string;
    user:string;
}

export interface Credentials {
    userName: string;
    password: string;
  } 