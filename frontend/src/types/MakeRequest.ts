import axiosInstance from "../assets/api/axiosInstance";
import type { MakeRequestProps } from "./MakeRequestProps";
const MakeRequest = async <T>(props: MakeRequestProps) => {
    return axiosInstance<T>(props);

};

export default MakeRequest;
