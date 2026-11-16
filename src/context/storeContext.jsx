//storeContext.jsx

import { useState, createContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const storeContext = createContext()

export const StoreProvider = ({ children }) => {
  //define your states/functions/data here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [books, setBooks] = useState([]);


  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token")

  function isTokenExpired(token) {
    if (!token) return
      
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000 <Date.now();
  }

  useEffect(() => {
    if (!token || isTokenExpired(token) === true) {
      setIsAuth(false);
      if (token) {
        localStorage.removeItem("token")  //remove token from localstorage
      }
    } else {
      setIsAuth(true)
    getAllBooks();
    }
  }, []);


  async function getAllBooks() {
    try {
      // console.log("running all books");
      const response = await fetch(`${apiUrl}/book/allbooks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      
      const data = await response.json()
      if (response.ok) {
        setBooks(data.allBooks);
      }

    } catch (error) {
      console.log(error);
    }
  }
  

  
  //exporting states/functions/data
  const contextObj = {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    setIsLoading,
    isAuth,
    setIsAuth,
    books,
    setBooks,
    apiUrl,
    getAllBooks,
    token
    
  };
  return (
    <storeContext.Provider value={contextObj}>{children}</storeContext.Provider>
  );
};