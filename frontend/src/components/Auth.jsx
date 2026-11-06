import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import API from "../services/api";

export default function Auth({ onBack, onLoginSuccess  }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const endpoint = isLogin ? "/auth/login" : "/auth/register";

        const response = await API.post(endpoint, formData);

        // Save login token
        localStorage.setItem("token", response.data.token);

        // Save customer information
        localStorage.setItem("user", JSON.stringify(response.data.user));

        onLoginSuccess(response.data.user);

    } catch (error) {
        alert(
        error.response?.data?.message || "Something went wrong"
        );
    }
    };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
        {/* Back to Home button */}
    <button
      type="button"
      onClick={onBack}
      className="mb-4 text-sm font-semibold text-orange-600 hover:text-orange-700"
    >
      ← Back to Home
    </button>
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h2>

        <p className="mb-8 text-center text-gray-500">
          {isLogin
            ? "Login to continue ordering delicious food"
            : "Join FoodieHub and enjoy delicious food"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                required
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
  <label className="mb-2 block text-sm font-medium">
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Enter your password"
      className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-orange-500"
      required
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
</div>

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-600 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 font-semibold text-orange-600 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

      </div>
    </div>
  );
}