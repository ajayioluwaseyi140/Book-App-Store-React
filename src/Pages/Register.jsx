import { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../Layout/Spinner";

function Register() {
  const { password, setPassword, email, setEmail, apiUrl, isLoading, setIsLoading } = useContext(storeContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function clearForm() { setEmail(""); setPassword(""); }

  async function registerUser() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "registration successful");
        navigate("/login");
        clearForm();
      } else {
        console.log(data);
        toast.error(data.message || "Registration failed. Try Again");
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Network Error. Try again");
      console.log(error);
      setIsLoading(false);
    }
  }

  function submitHandler(e) { e.preventDefault(); console.log("got here"); registerUser(); }
  function toggle() { if (showPassword) setShowPassword(false); else setShowPassword(true); }
  if (isLoading) return <Spinner />;

  return (
    <>
      <main className="min-h-[78vh] bg-[#faf8f4] px-4 pb-16 pt-28 sm:px-6">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_70px_-45px_rgba(41,37,31,0.4)] lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="relative hidden min-h-full flex-col justify-between overflow-hidden bg-[#44544b] p-10 text-white lg:flex xl:p-14">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -right-6 -top-6 h-44 w-44 rounded-full border border-white/10" />
            <div className="relative">
              <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-stone-100">A place for readers</span>
              <h2 className="mt-8 font-serif text-4xl leading-tight xl:text-5xl">Make room for a new favorite.</h2>
              <p className="mt-4 leading-7 text-stone-200">Create your account and start building a bookshelf that feels like yours.</p>
            </div>
            <div className="relative mt-10 flex items-end gap-3">
              <div className="flex h-36 w-24 flex-col justify-between rounded-sm border-l-4 border-[#d6b77d] bg-[#a4563f] p-3 text-[#f7ead5] shadow-xl">
                <span className="text-[9px] uppercase tracking-[0.18em]">A novel</span><span className="font-serif text-xl leading-tight">New<br />Worlds</span><span className="text-[9px] uppercase tracking-[0.18em]">Chapter one</span>
              </div>
              <div className="mb-3 flex h-32 w-20 flex-col justify-between rounded-sm border-l-4 border-[#c79a5e] bg-[#302921] p-3 text-[#f3e5c7] shadow-xl">
                <span className="text-[9px] uppercase tracking-[0.18em]">Collected</span><span className="font-serif text-lg leading-tight">Stories<br />to keep</span><span className="text-[9px] uppercase tracking-[0.18em]">Volume I</span>
              </div>
              <div className="mb-1 flex h-40 w-24 flex-col justify-between rounded-sm border-l-4 border-[#bca77d] bg-[#d1a96c] p-3 text-[#3d3024] shadow-xl">
                <span className="text-[9px] uppercase tracking-[0.18em]">Explore</span><span className="font-serif text-xl leading-tight">The<br />Elsewhere</span><span className="text-[9px] uppercase tracking-[0.18em]">A journey</span>
              </div>
            </div>
          </aside>
          <div className="p-6 sm:p-10 lg:p-12 xl:p-14">
          <h1 className="text-center font-serif text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Create your account</h1>
          <p className="mx-auto mt-3 max-w-md text-center text-sm leading-6 text-stone-500">A lovely bookshelf is just a few details away.</p>
          <form onSubmit={submitHandler} className="mt-8 space-y-5">
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
                <input id="password" type={showPassword ? "text" : "password"} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 pr-12 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#9a5d2f] focus:ring-4 focus:ring-[#9a5d2f]/10" placeholder="Create a password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                <button type="button" className="absolute inset-y-0 right-0 mt-2 grid w-12 place-items-center text-stone-400 transition hover:text-stone-700" onClick={toggle} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <FaEye /> : <FaEyeSlash />}</button>
              </div>
            </div>
            <button type="submit" className="block w-full rounded-full bg-[#8a4b24] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#713b1c]">Create account</button>
            <p className="pt-1 text-center text-sm text-stone-500">Already have an account? <Link className="font-semibold text-[#8a4b24] underline-offset-4 hover:underline" to="/login">Sign in</Link></p>
          </form>
          </div>
        </div>
      </main>
    </>
  );
}
export default Register;
