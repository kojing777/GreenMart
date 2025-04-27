import React from "react";
import { useAppContext } from "../Context/AppContext";
import { toast } from "react-hot-toast";


const Login = () => {
  const { setShowUserLogin, setUser } = useAppContext();
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
    
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({
        name: name || "kojing",
        email: email || "kojing92@example.com",
      });
      
      toast.success(
        state === "register" 
          ? "Account created successfully!" 
          : "Logged in successfully!",
        {
          position: "center-top",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      
      setShowUserLogin(false);
    } catch (error) {

      toast.error(
        state === "register" 
          ? "Failed to create account. Please try again." 
          : "Login failed. Please check your credentials.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              placeholder="kojng moktan"
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
            placeholder="Kojing@email.com"
            className="w-full p-2.5 mt-1 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            type="email"
            required
          />
        </div>

        <div className="w-full space-y-1 relative">
          <label className="text-gray-700 font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="********"
            className="w-full p-2.5 pr-10 mt-1 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            type={showPassword ? "text" : "password"}
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 bottom-2.5 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
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
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            state === "register" ? "Create Account" : "Login"
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
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 p-2 rounded-lg border border-gray-300 hover:border-google-red hover:bg-google-red/5 transition-colors"
          >
            <svg className="w-5 h-5" fill="#DB4437" viewBox="0 0 24 24">
              <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.152-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.61-0.056-1.207-0.156-1.781h-9.844z"/>
            </svg>
            <span className="text-gray-700 group-hover:text-google-red">Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 p-2 rounded-lg border border-gray-300 hover:border-facebook-blue hover:bg-facebook-blue/5 transition-colors"
          >
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
            </svg>
            <span className="text-gray-700 group-hover:text-facebook-blue">Facebook</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;