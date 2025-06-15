
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window to the top whenever the route changes.
 * Place this component in your app where the router is used.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior, // Use "instant" for immediate jump for navigation
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
