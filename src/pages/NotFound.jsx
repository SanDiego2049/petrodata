import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#1A2E35] min-h-screen flex items-center justify-center text-white">
      <div className="bg-[#2A3F47] p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">Page Not Found</p>
        <button
          onClick={goHome}
          className="bg-[#B4FF00] text-black px-4 py-2 rounded-lg font-sans text-base font-medium"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
