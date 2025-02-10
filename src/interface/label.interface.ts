export interface LabelInterface {
    "@id": string
    "@type": "Label"
    id: number
    name: LabelType
    color: string
}

export type LabelType = 'feature' | 'bug' | 'security' | 'design' | 'ui' | 'backend' | 'api' | 'testing' | 'setup' | 'maintenance';