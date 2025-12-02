import { Blocks } from "../app/page"

export interface BaseParams {
    [key: string]: string | string[] | undefined
}

export interface RouteParams extends BaseParams {
    documentId?: string
}

export type Params = Promise<RouteParams>
export type SearchParams = Promise<BaseParams>

export type StrapiImage = {
    id: number
    documentId: string
    url: string
    alternativeText: string | null
}

export type StrapiLink = {
    id: number
    href: string
    label: string
    isExternal: boolean
}

export type StrapiFeature = {
    id: number
    heading: string
    sub_heading: string
    icon: string
}

export type StrapiHomePage = {
    id: number,
    documentId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    title: string
    description: string
    blocks: Blocks[]
}

export type StrapiGlobal = {
    id: number
    documentId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    title: string
    description: string
    header: StrapiHeader
    footer: StrapiFooter
}

export type StrapiHeader = {
    id: number
    ctaButton: StrapiLink
    logoText: StrapiLink
    logo: StrapiImage
}

export type StrapiFooter = {
    id: number
    text: string
    socialLinks: StrapiLink[]
    logoText: StrapiLink
    logo: StrapiImage
}


export type StrapiResponse<T = null> = {
    success: boolean;
    data?: T;
    error?: {
        status: number;
        name: string;
        message: string;
        details?: Record<string, string[]>;
    };
    meta?: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
    status: number;
};