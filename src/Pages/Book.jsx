import { Link, useParams } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import {useContext, useEffect, useState } from "react"
import Spinner from "../Layout/Spinner";
import { toast } from "react-toastify";

function Book() {
  const {token, apiUrl, isLoading, setIsLoading} = useContext(storeContext)
  const [book, setBook] = useState({});
  const params = useParams()
  const bookId = params.bookId;

  useEffect(() => {
    getBook();
  },[])

  async function getBook() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/book/single/${bookId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (response.ok) {
        toast.success(data.message);
        setBook(data.book);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <main className="min-h-[75vh] bg-[#faf8f4] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-[#8a4b24]">
          <span aria-hidden="true">←</span> Back to your shelf
        </Link>
        <section className="mt-6 grid overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_70px_-45px_rgba(41,37,31,0.4)] lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center p-6 sm:p-10 lg:order-1 lg:p-14">
            <span className="w-fit rounded-full bg-[#f3ece3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#85502f]">
              {book.category === undefined ? "A good read" : book.category.name}
            </span>
            <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl">{book.title}</h1>
            <p className="mt-3 text-base text-stone-500">by <span className="font-medium text-stone-800">{book.author}</span></p>
            <div className="my-7 h-px bg-stone-100" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">About this book</h2>
            <p className="mt-3 whitespace-pre-line text-base leading-7 text-stone-600">{book.description}</p>
            <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-[#faf8f4] p-5">
              <span className="text-sm font-medium text-stone-500">Price</span>
              <span className="font-serif text-2xl font-semibold text-[#8a4b24]">${book.price}</span>
            </div>
          </div>
          <div className="order-1 min-h-64 bg-[#e8dfd1] p-5 sm:p-8 lg:order-2 lg:min-h-[560px]">
            <img src="https://picsum.photos/500/700" alt="Book cover" className="h-full min-h-64 w-full rounded-2xl object-cover object-center shadow-xl sm:min-h-80 lg:min-h-full" />
          </div>
        </section>
      </div>
    </main>
  );
}
export default Book
