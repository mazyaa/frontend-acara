interface IRegency {
    id: string;
    name: string;
}

interface IEventForm {
    name: string;
    slug: string;
    category: string;

    startDate: DateValue;
    endDate: DateValue;

    isPublish: boolean;
    isFeatured: boolean;
    isOnline: boolean;

    description: string;

    region: string;
    latitude: string;
    longitude: string;

    banner: string | FileList;
}

interface IEventResponse {
    _id: string;
    name: string;
    slug: string;
    category: string;

    startDate: string;
    endDate: string;

    isPublish: boolean;
    isFeatured: boolean;
    isOnline: boolean;

    description: string;

    location: {
        region: string;
        coordinates: number[];
    };

    banner: string;
}

interface IUpdateEvent extends Partial<IEventForm> {}

export type { IEventForm, IEventResponse, IUpdateEvent, IRegency };