import authServices from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useLandingPageLayoutNavbar = () => {
    const session = useSession();
    const getProfileData = async () => {
        const { data } = await authServices.getProfile();

        return data.data;
    }

    const { data: dataProfile } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfileData,
        enabled: session.status === "authenticated",
    });

    return {
        dataProfile,
    };
};

export default useLandingPageLayoutNavbar;