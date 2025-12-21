'use server'
import { StrapiResponse } from "@/types";
import { UpdateProfileValues } from "../validation/profile";
import { getProfile, StrapiAuthUser } from "./auth";
import { getAuthToken } from "../actions/auth";
import { getStrapiURL } from "../../lib/utils";
import { api } from "../data-api";

const baseUrl = getStrapiURL()

export async function updateProfileService(values: UpdateProfileValues): Promise<StrapiResponse<StrapiAuthUser>> {
    const user = await getProfile()
    if (!user.success || !user.data) {
        throw new Error("Usuário inválido");
    }

    const authToken = await getAuthToken()

    const url = new URL(`/api/users/${user.data.id}`, baseUrl);
    return api.put(url.href, values, { authToken })
}