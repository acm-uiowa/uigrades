interface Details {
    name: string;
    association: string;
    role: string;
}

interface ImageInfo {
    path: string;
    alt: string;
}

interface Externals {
    linkedin: string;
    github?: string;
}

export interface Organizer {
    imageInfo: ImageInfo;
    details: Details;
    externals: Externals;
}

export interface Secondary {
    name: string;
    external: string;
    imageInfo: ImageInfo;
}
