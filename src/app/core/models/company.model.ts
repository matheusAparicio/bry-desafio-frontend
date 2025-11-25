import { Customer, Employee } from "./user.model";

export interface Company {
    id: number;
    name: string,
    cnpj: string,
    address: string,
    employees: Employee[],
    customers: Customer[],
}