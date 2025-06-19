import { createContext, useContext } from "react";
import { useLocalState } from "../util/useLocalStorage";

//Creating the context that we want to use
const UserContext = createContext();

//Takes in children as the children are being rendered through this element
const UserProvider = ({ children }) => {
  //Getting jwt and setJwt from local state
  const [jwt, setJwt] = useLocalState("", "jwt");
  //Exporting the jwt and setJwt with context
  return (
    <UserContext.Provider value={{ jwt, setJwt }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  //Getting the context
  const context = useContext(UserContext);
  //If we don't have the context, return error. Else, return the context
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
