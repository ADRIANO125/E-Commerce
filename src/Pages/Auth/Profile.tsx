import React, { useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { resizeImage } from "../../utils/imageUtils";

function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    // If user is not logged in, redirect to login page
    navigate("/login");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update user information
    updateUser({
      name,
      email,
      avatar: avatarPreview || avatar,
    });

    setMessage({
      type: "success",
      text: "Profile updated successfully!",
    });

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
            <p className="text-blue-100">Manage your account information</p>
          </div>

          <div className="p-6">
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture Section */}
              <div className="md:w-1/3">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="mb-4">
                    {avatarPreview || avatar ? (
                      <img
                        src={avatarPreview || avatar}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold mx-auto border-4 border-white shadow">
                        {name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center gap-2 mb-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const resizedImage = await resizeImage(
                              file,
                              200,
                              200
                            );
                            setAvatarPreview(resizedImage);
                          } catch (error) {
                            console.error("Failed to resize image", error);
                            // Fallback to original if resize fails
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                setAvatarPreview(event.target.result as string);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                  <p className="text-gray-600">{email}</p>

                  <button
                    onClick={handleLogout}
                    className="mt-6 w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Profile Form Section */}
              <div className="md:w-2/3">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Picture (optional)
                    </label>
                    <div className="flex items-center gap-4">
                      {avatarPreview || avatar ? (
                        <img
                          src={avatarPreview || avatar}
                          alt="Preview"
                          className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xl">👤</span>
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const resizedImage = await resizeImage(
                                  file,
                                  200,
                                  200
                                );
                                setAvatarPreview(resizedImage);
                              } catch (error) {
                                console.error("Failed to resize image", error);
                                // Fallback to original if resize fails
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    setAvatarPreview(
                                      event.target.result as string
                                    );
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }
                          }}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                        >
                          Choose Image
                        </button>
                        {(avatarPreview || avatar) && (
                          <button
                            type="button"
                            onClick={() => {
                              setAvatarPreview("");
                              setAvatar("");
                              if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                              }
                            }}
                            className="ml-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
