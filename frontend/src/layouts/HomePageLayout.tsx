import { Outlet } from "react-router-dom";
import homeLogo from "../assets/images/bgremovedlogo.png";
import userProfileImg from "../assets/images/profile.png";
import { useEffect, useState } from "react";
import UserProfile from "../components/Home/UserProfile";
import axios from "axios";
import axiosInstance from "../assets/api/axiosInstance";

const HomePageLayout = () => {
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `/user`,
      });

      if (response?.status == 200) {
        const { message, user } = response?.data;
        console.log(message);
        setUser(user.name);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
      } else {
        console.error("common error", err);
      }
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <div className="h-dvh bg-gray-100" onClick={() => setOpenProfile(false)}>
        <div className="flex justify-between px-2 py-1 w-full bg-linear-to-r from-cyan-400 to-blue-400 2xl:px-7 fixed z-20">
          <div className="w-24 md:w-32 ">
            <img src={homeLogo} alt="tasker-logo" className="rounded-xl" />
          </div>
          <div
            className="flex items-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={userProfileImg}
              alt="profile"
              className="w-12 rounded"
              onClick={() => setOpenProfile(true)}
            />
            {openProfile && <UserProfile setOpenProfile={setOpenProfile} user={user} />}
          </div>
        </div>
        <div className="pt-16 z-10 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default HomePageLayout;
