import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { UserProfileProps } from "../../types/TaskTypes";
import MakeRequest from "../../types/MakeRequest";
import type { LogoutResponse } from "../../types/AuthTypes";
import { toast } from "react-toastify";


const UserProfile = ({ setOpenProfile, user }: UserProfileProps) => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    const logoutReq = {
      method: "post",
      url: "/logout",
    };
    try {
      const response = await MakeRequest<LogoutResponse>(logoutReq);

      if (response.status == 200) {
        const { message } = response.data;
        toast.success(message);
        localStorage.removeItem("access_token");
        setOpenProfile(false);
        navigate("/login");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data);
      } else {
        console.error("common error", err);
      }
    }
  };
  return (
    <div className="absolute bg-white  rounded-xs top-5 right-10 pe-6 ps-2 z-[9999]  py-3 flex flex-col gap-3 max-w-[150px]">
      <p className="text-md font-semibold text-black">{user}</p>
      <button
        type="button"
        className="bg-sky-500 max-w-[80px] rounded-sm text-white py-0 px-2 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
