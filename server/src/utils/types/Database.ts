export type StatusType = 'error' | 'successed';
export type FindType = 'findOne' | 'findAll';

export interface Status {
    id?: string;

    text: string;
    type: StatusType;
    
    error?: any;
    tag?: any;
};