import qs from "qs";
import type { StrapiResponse, StrapiHomePage, StrapiGlobal, StrapiMetaData } from "@/types";

import { api } from "@/data/data-api";
import { getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

async function getHomePageData(): Promise<StrapiResponse<StrapiHomePage>> {
    const query = qs.stringify({
        populate: {
            blocks: {
                on: {
                    "layout.hero-section": {
                        populate: {
                            image: {
                                fields: ["url", "alternativeText"],
                            },
                            link: {
                                populate: true,
                            },
                        },
                    },
                    "layout.features-section": {
                        populate: {
                            features: {
                                populate: true,
                            },
                        },
                    },
                },
            },
        },
    });

    const url = new URL("/api/home-page", baseUrl);
    url.search = query;
    return api.get<StrapiHomePage>(url.href);
}

async function getGlobalData(): Promise<StrapiResponse<StrapiGlobal>> {
    const query = qs.stringify({
        populate: [
            "header.logoText",
            "header.ctaButton",
            "header.logo",
            "footer.logoText",
            "footer.socialLinks",
            "footer.logo"
        ],
    });

    const url = new URL("/api/global", baseUrl);
    url.search = query;
    return api.get<StrapiGlobal>(url.href);
}

async function getMetaData(): Promise<StrapiResponse<StrapiMetaData>> {
    const query = qs.stringify({
        fields: ["title", "description"]
    })
    const url = new URL("/api/global", baseUrl);
    url.search = query;
    return api.get<StrapiMetaData>(url.href)
}

export const loaders = {
    getMetaData,
    getHomePageData,
    getGlobalData
};