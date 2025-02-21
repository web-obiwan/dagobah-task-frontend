export interface ResponseInterface {
    '@context': string;
    '@id': string;
    '@type': string;
    totalItems: number,
    view?: ResponseViewInterface,
    search?: ResponseTemplateInterface
}

export interface ResponseViewInterface {
    '@id': string;
    '@type': string;
    first: string;
    last: string;
    next: string;
}

export interface ResponseTemplateInterface {
    '@type': string;
    template: string;
    variableRepresentation: string;
    mapping: ResponseTemplateMappingInterface[];
}

export interface ResponseTemplateMappingInterface {
    '@type': string;
    variable: string;
    property: string | null;
    required: boolean;
}
