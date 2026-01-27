import { useNavigate } from "react-router-dom";
import axiosInstance from "../../assets/api/axiosInstance";
import axios from "axios";

type UserProfileProps = {
  setOpenProfile: (value: boolean) => void;
  user: string;
};

const UserProfile = ({ setOpenProfile, user }: UserProfileProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: "/logout",
      });

      if (response.status == 200) {
        console.log(response.data.message);
        localStorage.removeItem("access_token");
        setOpenProfile(false);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
      } else {
        console.error("common error", err);
      }
    }
  };
  return (
    <div className="absolute bg-white  rounded-xs top-5 right-17 pe-6 ps-2 z-100 py-3 flex flex-col gap-3 max-w-[150px]">
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
