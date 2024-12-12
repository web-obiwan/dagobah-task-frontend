export interface Link {
    title: string;
    icon: string;
    isActive: boolean;
    to?: {
        name: string;
        params?: Record<string, any>;
        query?: Record<string, any>;
    };
    items: SubLink[];
}

export interface SubLink {
    title: string;
    to: {
        name: string;
        params?: Record<string, any>;
        query?: Record<string, any>;
    };
}


export interface ButtonAction {
    title: string
    action: object
    icon: string
    variant: 'ghost'
}

export interface Module {
    icon: string;
    label: string
    subLabel: string
    url: string
}
