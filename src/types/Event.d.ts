interface IRegency {
    id: string;
    name: string;
}

interface IEvent {
    _id?: string;
    name: string;
    slug: string;
    category: string;
    startDate: Date;
    endDate: Date;
    isPublish: boolean;
    isFeatured: boolean;
    description: string;
    location: {
        region: string;
        coordinate: {
            x: number;
            y: number;
        }
    }
    banner: string;
}

export type { IEvent, IRegency };