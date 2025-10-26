import toast, { type ToastOptions } from "react-hot-toast";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";

interface ShowToastOptions {
  message: string;
  image?: string;
  type?: "success" | "error" | "loading";
  duration?: number;
  showButton?: boolean;
}

export const showToast = ({
  message,
  image,
  type = "success",
  duration = 3500,
}: ShowToastOptions) => {
  const getStyles = (): ToastOptions["style"] => {
    return {
      padding: 0,
      background: "transparent",
      boxShadow: "none",
    };
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200";
      case "error":
        return "bg-gradient-to-r from-red-50 to-rose-50 border-red-200";
      case "loading":
        return "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200";
      default:
        return "bg-white border-gray-200";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
            <FaCheckCircle className="text-green-600 text-xl" />
          </div>
        );
      case "error":
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
            <FaExclamationTriangle className="text-red-600 text-xl" />
          </div>
        );
      case "loading":
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
            <FaSpinner className="text-blue-600 text-xl animate-spin" />
          </div>
        );
      default:
        return null;
    }
  };

  const CustomToast = () => (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl border-2 shadow-lg backdrop-blur-sm ${getBackgroundColor()} min-w-[320px] max-w-md animate-in slide-in-from-top-5 duration-300`}
    >
      {/* Icon */}
      {getIcon()}

      {/* Product Image */}
      {image && (
        <div className="flex-shrink-0">
          <img
            src={image}
            alt="product"
            className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-md"
          />
        </div>
      )}

      {/* Message + Button */}
      <div className="flex flex-col flex-1 gap-2">
        <span className="font-semibold text-gray-800 text-sm leading-relaxed">
          {message}
        </span>

      </div>
    </div>
  );

  toast.custom(<CustomToast />, {
    duration,
    style: getStyles(),
  });
};