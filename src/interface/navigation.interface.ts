export interface Link {
    title: string
    label?: string
    to: {
        name: string;
        params?: Record<string, any>;
        query?: Record<string, any>;
    };
    icon: string
    variant: 'default' | 'ghost'
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
}