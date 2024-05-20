import type { UUID } from "crypto";

export interface BankMaster {
    _id: UUID,
    name: string,
    code: string,
    logo: Blob
}