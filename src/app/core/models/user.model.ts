import { Company } from "./company.model";
import { DocumentFile } from "./document_file.model";

interface User {
    id: number;
    login: string,
    name: string,
    cpf: string,
    email: string,
    address: string,
    companies: Company[],
    document_file: DocumentFile,
}

export interface Employee extends User {}
export interface Customer extends User {}
