import { useEffect } from "react";
import { useRouter } from "next/router";

// TEMPORARY - Until I create a website for the application
export default function Website() {
    const router = useRouter();

    useEffect(() => {
        router.push("home");
    }, []);

    return null;
}
