import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Chrome } from 'lucide-react';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword,
  createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import firebaseConfig from '@/utils/config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const SignupPage = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);


  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    
          try {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, formData.email, formData.password);
          console.log('Login successful');
          navigate('/');
        } else {
          if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            setIsLoading(false);
            return;
          }
          await createUserWithEmailAndPassword(auth, formData.email, formData.password);
          console.log('Signup successful');
          navigate('/');
        }
      } catch (error) {
        console.error('Authentication error:', error);
      }
    
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
      console.log('Google sign-in successful');
      navigate('/');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  const inputClass =
    "w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 backdrop-blur-sm";

  const btnPrimary =
    "w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";

  const btnGhost =
    "w-full py-3 rounded-xl font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 transform hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";

  const enter = (delayClass = "delay-0") =>
    `${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} transition-all duration-500 ${delayClass}`;

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-black" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="relative w-full max-w-xs sm:max-w-md">
        {/* Card Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-8 border border-white/20 transform transition-all duration-500 hover:scale-105 text-white">
          {/* Header */}
          <div className={`text-center mb-6 sm:mb-8 ${enter("delay-100")}`}> 
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-300 to-cyan-100 rounded-full mb-4 ">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              {isLogin ? 'Sign in to your account' : 'Create your new account'}
            </p>
          </div>
          {/* Input Fields Container */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name Field (Only for Signup) */}
            {!isLogin && (
              <div className={`relative ${enter("delay-150")}`}>
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  style={{ color: "white" }}
                  value={formData.name}
                  onChange={handleInputChange}
                  className={inputClass + " text-sm sm:text-base"}
                  required
                />
              </div>
            )}

            {/* Email Field */}
            <div className={`relative ${enter("delay-200")}`}>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className={inputClass + " text-sm sm:text-base"}
                required
              />
            </div>

            {/* Password Field */}
            <div className={`relative ${enter("delay-250")}`}>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={inputClass + " text-sm sm:text-base"}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Confirm Password Field (Only for Signup) */}
            {!isLogin && (
              <div className={`relative ${enter("delay-300")}`}>
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={inputClass + " text-sm sm:text-base"}
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`${btnPrimary} ${enter("delay-350")} w-full text-sm sm:text-base`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                  Processing...
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className={`flex items-center my-6 ${enter("delay-400")}`}>
            <div className="flex-1 border-t border-white/20" />
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-white/20" />
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className={`${btnGhost} ${enter("delay-450")}` + " w-full text-sm sm:text-base"}
          >
            <Chrome className="w-5 h-5 mr-2" />
            Continue with Google
          </button>

          {/* Toggle Login/Signup */}
          <div className={`text-center mt-4 sm:mt-6 ${enter("delay-500")}`}>
            <p className="text-gray-400 text-xs sm:text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
