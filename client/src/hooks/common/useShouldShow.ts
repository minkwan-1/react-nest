import { useLocation } from "react-router-dom";

export const useShouldShow = () => {
  const location = useLocation();

  const showOnPaths = ["/home", "/my", "/my/edit", "/questions"];

  const shouldShow = showOnPaths.some((path) => {
    if (path === "/questions") {
      return location.pathname.startsWith("/questions/");
    }
    if (path === "/modify") {
      return location.pathname.startsWith("/modify/");
    }
    return location.pathname === path;
  });

  return shouldShow;
};
