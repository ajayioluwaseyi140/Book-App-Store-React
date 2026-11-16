import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";
import Spinner from "../Layout/Spinner";
import { FiBookOpen, FiEdit2, FiExternalLink, FiPlus, FiTrash2 } from "react-icons/fi";

function Dashboard() {
  const { token, apiUrl, books, getAllBooks, isLoading, setIsLoading } = useContext(storeContext);

  useEffect(() => {
    getAllBooks();
    console.log(books)
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [bookId, setBookId] = useState("");

  function clearForm() {
    setTitle(""); setPrice(""); setDescription(""); setAuthor(""); setCategoryId(""); setBookId(""); setEditMode(false);
  }

  async function updateHandler(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/book/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: title, price: Number(price), description: description, author: author, categoryId: Number(categoryId), bookId: Number(bookId) }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        clearForm();
        getAllBooks();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function deleteBook(bookId) {
    try {
      const userConfirmed = window.confirm("Are you sure you want to delete this book?");
      if (!userConfirmed) { toast.error("Delete cancelled"); return; }
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/book/delete/${bookId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        getAllBooks();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function createBook() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/book/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: title, price: Number(price), description: description, author: author, categoryId: Number(categoryId) }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        clearForm();
        getAllBooks();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    createBook();
  }

  if (isLoading) return <Spinner />;

  const fieldClass = "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#9a5d2f] focus:ring-4 focus:ring-[#9a5d2f]/10";

  return (
    <main className="min-h-[75vh] bg-[#faf8f4] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#85502f]">Your bookstore</p>
            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">The bookshelf</h1>
            <p className="mt-3 max-w-xl text-stone-500">Keep your collection in order and make room for its next great addition.</p>
          </div>
          <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-stone-200 bg-white px-5 py-3 shadow-sm">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f3ece3] text-[#8a4b24]"><FiBookOpen aria-hidden="true" /></span>
            <span><span className="block text-xl font-semibold text-stone-900">{books.length}</span><span className="text-xs text-stone-500">books on your shelf</span></span>
          </div>
        </div>

        <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <form onSubmit={editMode ? updateHandler : submitHandler} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-[0_20px_60px_-45px_rgba(41,37,31,0.35)] sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#85502f]">{editMode ? "Make an update" : "Grow your collection"}</p>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-stone-900">{editMode ? "Edit book details" : "Add a new book"}</h2>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f3ece3] text-[#8a4b24]"><FiPlus aria-hidden="true" /></span>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-stone-700" htmlFor="title">Book title<input className={fieldClass} id="title" type="text" placeholder="e.g. The Midnight Library" onChange={(e) => setTitle(e.target.value)} value={title} required /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-stone-700" htmlFor="author">Author<input className={fieldClass} id="author" type="text" placeholder="Author name" onChange={(e) => setAuthor(e.target.value)} value={author} required /></label>
                <label className="block text-sm font-medium text-stone-700" htmlFor="price">Price<input className={fieldClass} id="price" type="number" placeholder="0.00" onChange={(e) => setPrice(e.target.value)} value={price} required /></label>
              </div>
              <label className="block text-sm font-medium text-stone-700" htmlFor="category">Category
                <select className={fieldClass} id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                  <option value="">Choose a category</option><option value="8">Art</option><option value="7">Science</option><option value="11">Fantasy</option><option value="9">Religion</option><option value="10">Politics</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-stone-700" htmlFor="description">Description<textarea className={`${fieldClass} min-h-28 resize-y`} id="description" placeholder="What makes this book worth reading?" onChange={(e) => setDescription(e.target.value)} value={description} required /></label>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              {editMode && <button type="button" onClick={clearForm} className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50">Cancel</button>}
              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#8a4b24] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#713b1c]" type="submit">
                {editMode ? <FiEdit2 aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
                {editMode ? "Save changes" : "Add to bookshelf"}
              </button>
            </div>
          </form>

          <section aria-labelledby="book-list-heading">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#85502f]">Your collection</p>
                <h2 id="book-list-heading" className="mt-1 font-serif text-2xl font-semibold text-stone-900">Books on the shelf</h2>
              </div>
              <span className="rounded-full bg-stone-200/70 px-3 py-1 text-xs font-medium text-stone-600">{books.length} total</span>
            </div>
            {books.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#f3ece3] text-2xl text-[#8a4b24]"><FiBookOpen aria-hidden="true" /></span>
                <h3 className="mt-4 font-serif text-xl font-semibold text-stone-900">A shelf waiting for stories</h3>
                <p className="mt-2 text-sm text-stone-500">Add your first book using the form.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {books.map((book) => (
                  <article key={book.id} className="flex min-w-0 flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="mb-4 flex h-28 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#efe6da] to-[#e1d1bc] text-[#8a4b24]">
                      <FiBookOpen className="h-10 w-10" aria-hidden="true" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a5d2f]">{book.category?.name || "On the shelf"}</p>
                    <h3 className="mt-2 line-clamp-2 font-serif text-xl font-semibold leading-snug text-stone-900">{book.title}</h3>
                    <p className="mt-1 text-sm text-stone-500">{book.author || "Unknown author"}</p>
                    <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-stone-500">{book.description}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
                      <span className="font-semibold text-stone-900">${book.price}</span>
                      <Link to={`/book/${book.id}`} aria-label={`View ${book.title}`} className="grid h-9 w-9 place-items-center rounded-full bg-[#f3ece3] text-[#8a4b24] transition hover:bg-[#e9dfd2]"><FiExternalLink aria-hidden="true" /></Link>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button type="button" onClick={() => { setEditMode(true); setAuthor(book.author); setCategoryId(book.categoryId); setDescription(book.description); setPrice(book.price); setTitle(book.title); setBookId(book.id); }} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-700 transition hover:bg-stone-50"><FiEdit2 aria-hidden="true" /> Edit</button>
                      <button onClick={() => deleteBook(book.id)} type="button" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-red-100 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50"><FiTrash2 aria-hidden="true" /> Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
export default Dashboard;
