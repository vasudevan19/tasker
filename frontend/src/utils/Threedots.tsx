import { ThreeDots } from "react-loader-spinner";

const Threedots = () => {
    return (
    <div className="flex justify-center items-center min-h-screen">
        <ThreeDots
          height="50"
          width="50"
          radius="5"
          color="#1B0845"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ margin: "20px" }}
          wrapperClass="custom-loader"
          visible={true}
        />
    </div>
  );
};

export default Threedots;
