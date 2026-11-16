import { Link } from "react-router-dom";
import { FiArrowUpRight, FiBookOpen, FiBookmark } from "react-icons/fi";

function Hero() {
  return (
    <main className="overflow-hidden bg-[#faf8f4] pt-20">
      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9dfd2] bg-white px-4 py-2 text-sm font-medium text-[#85502f] shadow-sm">
            <FiBookmark aria-hidden="true" />
            A little more room for your next favorite
          </div>
          <h1 className="mt-7 font-serif text-5xl font-medium leading-[1.08] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl">
            Find a story
            <span className="block italic text-[#9a5d2f]">that stays</span>
            with you.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
            Browse a thoughtfully gathered shelf of books, discover a new favorite, and make space for the stories you love.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/register" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#8a4b24] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#8a4b24]/15 transition hover:-translate-y-0.5 hover:bg-[#713b1c]">
              Start exploring <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/login" className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-7 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50">
              I already have an account
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm text-stone-500">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#efe6da] text-[#8a4b24]">
              <FiBookOpen aria-hidden="true" />
            </span>
            Your next chapter is just around the corner.
          </div>
        </div>

        <div className="relative mx-auto flex h-[330px] w-full max-w-[500px] items-center justify-center sm:h-[440px]">
          <div className="absolute inset-x-7 inset-y-8 rotate-[-5deg] rounded-[2rem] bg-[#eee5d9]" />
          <div className="absolute inset-x-4 inset-y-4 rotate-[4deg] rounded-[2rem] bg-[#d8c8b3]" />
          <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-[2rem] bg-[#302921] px-6 py-10 shadow-2xl shadow-stone-900/20 sm:px-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10" />
            <div className="relative flex items-end justify-center gap-3 sm:gap-5">
              <div className="flex h-48 w-28 -rotate-6 flex-col justify-between rounded-sm border-l-4 border-[#c79a5e] bg-[#44544b] p-3 text-[#f3e5c7] shadow-xl sm:h-60 sm:w-36 sm:p-4">
                <span className="text-[9px] uppercase tracking-[0.22em] sm:text-[10px]">A quiet classic</span>
                <span className="font-serif text-xl leading-tight sm:text-2xl">The<br />Wild Garden</span>
                <span className="text-[9px] uppercase tracking-[0.18em]">Field notes</span>
              </div>
              <div className="z-10 flex h-60 w-36 flex-col justify-between rounded-sm border-l-4 border-[#d6b77d] bg-[#a4563f] p-4 text-[#f7ead5] shadow-2xl sm:h-72 sm:w-44 sm:p-5">
                <span className="text-[10px] uppercase tracking-[0.24em]">A novel</span>
                <span className="font-serif text-3xl leading-tight sm:text-4xl">Where<br />we begin</span>
                <span className="text-[10px] uppercase tracking-[0.2em]">Elena Rivers</span>
              </div>
              <div className="flex h-44 w-24 rotate-6 flex-col justify-between rounded-sm border-l-4 border-[#bca77d] bg-[#d1a96c] p-3 text-[#3d3024] shadow-xl sm:h-52 sm:w-32 sm:p-4">
                <span className="text-[9px] uppercase tracking-[0.18em] sm:text-[10px]">Ideas &amp; wonder</span>
                <span className="font-serif text-lg leading-tight sm:text-xl">Small<br />Worlds</span>
                <span className="text-[9px] uppercase tracking-[0.18em]">Collected</span>
              </div>
            </div>
            <div className="relative mt-8 flex items-center gap-2 text-sm text-stone-300">
              <FiBookOpen className="text-[#d6b77d]" aria-hidden="true" />
              A shelf full of possibility
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Hero;
