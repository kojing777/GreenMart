import React from "react";
import { useAppContext } from "../Context/AppContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const { setShowUserLogin, setUser, navigate } = useAppContext();
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        navigate("/");
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 w-full max-w-md p-6 rounded-2xl shadow-2xl border border-gray-200 bg-white animate-scale-in"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            <span className="text-primary">Welcome</span> Back
          </h2>
          <p className="text-gray-500 mt-2">
            {state === "login"
              ? "Login to access your account"
              : "Create a new account"}
          </p>
        </div>

        {state === "register" && (
          <div className="w-full space-y-1">
            <label className="text-gray-700 font-medium">Full Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your full name"
              className="w-full p-2.5 mt-1 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full space-y-1">
          <label className="text-gray-700 font-medium">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="w-full p-2.5 mt-1 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            type="email"
            required
          />
        </div>

        <div className="w-full space-y-1">
          <label className="text-gray-700 font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="********"
            className="w-full p-2.5 mt-1 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            type="password"
            required
            minLength={6}
          />
        </div>

        {state === "login" && (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-primary hover:underline hover:text-primary-dark transition-colors"
            >
              Forgot password?
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-all ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : state === "register" ? (
            "Create Account"
          ) : (
            "Login"
          )}
        </button>

        <div className="text-center text-sm text-gray-500">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setState("login")}
                className="text-primary font-medium hover:underline hover:text-primary-dark transition-colors"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setState("register")}
                className="text-primary font-medium hover:underline hover:text-primary-dark transition-colors"
              >
                Sign up
              </button>
            </>
          )}
        </div>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 p-2 rounded-lg border border-gray-300 hover:border-google-red hover:bg-google-red/5 transition-colors"
          >
            <svg className="w-5 h-5" fill="#DB4437" viewBox="0 0 24 24">
              <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.152-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.61-0.056-1.207-0.156-1.781h-9.844z" />
            </svg>
            <span className="text-gray-700 group-hover:text-google-red">
              Google
            </span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 p-2 rounded-lg border border-gray-300 hover:border-facebook-blue hover:bg-facebook-blue/5 transition-colors"
          >
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
            <span className="text-gray-700 group-hover:text-facebook-blue">
              Facebook
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
