import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-sm text-stone-500">
            © {year} <span className="font-semibold text-stone-800">Between the Covers</span>. Made for the love of reading.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-5 text-sm text-stone-500">
            <li><Link to="/" className="transition hover:text-[#8a4b24]">Home</Link></li>
            <li><Link to="#" className="transition hover:text-[#8a4b24]">Privacy Policy</Link></li>
            <li><Link to="#" className="transition hover:text-[#8a4b24]">Terms</Link></li>
          </ul>
      </div>
    </footer>
  );
}
export default Footer;
