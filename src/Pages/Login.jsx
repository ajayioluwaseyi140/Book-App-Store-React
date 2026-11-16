import { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../Layout/Spinner";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const { password, setPassword, email, setEmail, apiUrl, isLoading, setIsLoading, setIsAuth } = useContext(storeContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function clearForm() { setEmail(""); setPassword(""); }

  async function loginUser() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Login successful");
        clearForm();
        setIsAuth(true);
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        console.log(data);
        toast.error("Login failed. Try Again");
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Network Error. Try again");
      console.log(error);
      setIsLoading(false);
    }
  }

  function submitHandler(e) { e.preventDefault(); console.log("got here"); loginUser(); }
  function toggle() { if (showPassword) setShowPassword(false); else setShowPassword(true); }
  if (isLoading) return <Spinner />;

  return (
    <>
      <main className="min-h-[78vh] bg-[#faf8f4] px-4 pb-16 pt-28 sm:px-6">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_70px_-45px_rgba(41,37,31,0.4)] lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="relative hidden min-h-full flex-col justify-between overflow-hidden bg-[#302921] p-10 text-white lg:flex xl:p-14">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -right-6 -top-6 h-44 w-44 rounded-full border border-white/10" />
            <div className="relative">
              <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-stone-200">Welcome back</span>
              <h2 className="mt-8 font-serif text-4xl leading-tight xl:text-5xl">The next chapter is yours.</h2>
              <p className="mt-4 leading-7 text-stone-300">Sign in to pick up where you left off and keep your favorite reads close.</p>
            </div>
            <div className="relative mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-serif text-xl italic text-[#e7cda5]">“A reader lives a thousand lives before he dies.”</p>
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-stone-400">— George R. R. Martin</p>
            </div>
          </aside>
          <div className="p-6 sm:p-10 lg:p-12 xl:p-14">
          <h1 className="text-center font-serif text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Welcome back</h1>
          <p className="mx-auto mt-3 max-w-md text-center text-sm leading-6 text-stone-500">Sign in to manage your bookshelf and discover something wonderful.</p>
          <div className="mt-7 flex justify-center">
         <GoogleLogin
            width="220"
            onSuccess={ async(credentialResponse) => {console.log(credentialResponse)
              try {
                setIsLoading(true);
                const response = await fetch(`${apiUrl}/auth/google-login`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ googleToken: credentialResponse.credential }),
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
        toast.success(data.message || "Login successful");
        setIsAuth(true);
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        console.log(data);
        toast.error("Login failed. Try Again");
      }
      setIsLoading(false);
              }
              
              catch (error) {
                console.log(error);
                setIsLoading(false);
              }
            }}

            onError={() => {
              console.log('Login Failed');
            }}
          />
          </div>
          <div className="my-6 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.16em] text-stone-400"><span className="h-px flex-1 bg-stone-200" />or use email<span className="h-px flex-1 bg-stone-200" /></div>
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-stone-700">Email address</label>
              <div className="relative">
                <input type="email" className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 pr-12 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#9a5d2f] focus:ring-4 focus:ring-[#9a5d2f]/10" placeholder="you@example.com" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mt-2 h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 00-4.5 1.207" />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-stone-700">Password</label>
              <div className="relative">
                <input id="password" type={showPassword ? "text" : "password"} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 pr-12 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#9a5d2f] focus:ring-4 focus:ring-[#9a5d2f]/10" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                <button type="button" className="absolute inset-y-0 right-0 mt-2 grid w-12 place-items-center text-stone-400 transition hover:text-stone-700" onClick={toggle} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <FaEye /> : <FaEyeSlash />}</button>
              </div>
            </div>
            <button type="submit" className="block w-full rounded-full bg-[#8a4b24] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#713b1c]">Sign in</button>
            <p className="pt-1 text-center text-sm text-stone-500">New to Between the Covers? <Link className="font-semibold text-[#8a4b24] underline-offset-4 hover:underline" to="/register">Create an account</Link></p>
          </form>
          </div>
        </div>
      </main>
    </>
  );
}
export default Login;
