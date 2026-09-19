import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../assets/api/axiosInstance";
import Threedots from "../utils/Threedots";

const RootRedirect = () => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                await axiosInstance.get("/me");

                setAuthenticated(true);
            } catch {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    if (loading) {
        return <Threedots />;
    }

    return (
        <Navigate
            to={authenticated ? "/home/list" : "/login"}
            replace
        />
    );
};

export default RootRedirect;