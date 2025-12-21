import { services } from "@/data/services";
import { validateApiResponse } from "@/lib/error-handler";
import { ProfileForm } from "@/components/forms/update-profile-form";

export default async function AccountRoute() {
    const user = await services.auth.getProfile();
    const userData = validateApiResponse(user, "user profile");
    const userImage = userData?.image;

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <ProfileForm user={user.data!} />
            {/* <ProfileImageForm image={userImage} className="col-span-2" /> */}
        </div>
    );
}