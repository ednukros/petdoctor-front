export interface Patient {
    id?: number;
    name: string;
    species: string;
    race: string;
    next_appointment: Date;
    phoneNumber: number;
    // email: string;
}