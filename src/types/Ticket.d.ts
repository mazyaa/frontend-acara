interface ITicket {
    _id?: string;
    name?: string;
    price?: number;
    quantity?: number;
    description?: string;
    events?: string; 
};

export type { ITicket };