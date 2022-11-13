import { useEffect } from 'react';
import { BrowserRouter, useLocation } from "react-router-dom";

        // This components helps to scroll to the top of every page to avoid doing it by yourself
        // I added it to the MAIN index.js component inside BrowserRouter (found in the web :) )
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}