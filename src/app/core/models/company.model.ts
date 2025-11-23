import { Customer, Employee } from "./employee.model";

export interface Company {
    name: string,
    cnpj: string,
    address: string,
    employees: Employee[],
    customers: Customer[],
}