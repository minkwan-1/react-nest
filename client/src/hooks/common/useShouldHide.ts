import { useLocation } from "react-router-dom";

export const useShouldHide = () => {
  const location = useLocation();

  const hideOnExactPaths = ["/", "/start", "/phone", "/redirect", "/edit"];

  const shouldHide =
    hideOnExactPaths.includes(location.pathname) ||
    location.pathname.startsWith("/modify/");

  return shouldHide;
};
