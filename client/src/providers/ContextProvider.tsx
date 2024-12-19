import { createContext, ReactNode } from "react";

export const ThemeContext = createContext("light");

// const useThemeContextValue = ()=>{
//     const value = useContext(ThemeContext)
//     return value
// }
// const theme = useContext(ThemeContext);

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProviderWrapper: React.FC<ContextProviderProps> = ({
  children,
}) => <ThemeContext.Provider value={"theme"}>{children}</ThemeContext.Provider>;

export default ContextProviderWrapper;
