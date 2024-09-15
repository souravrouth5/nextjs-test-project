export interface IFormSchema {
    email: string;
    name: string;
    address: {
        street: string;
        city: string;
    }
    youtube: string[];
    social: {value: string}[];
}