export interface Weather {
    date:number;
    temp2m: MinMax;
    weather:string;
    wind10m_max:number;
}

export interface MinMax{
    min:number;
    max:number;
}