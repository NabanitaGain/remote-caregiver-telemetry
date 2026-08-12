import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem("caregiverLoggedIn");

    return savedUser ? JSON.parse(savedUser) : null;

  });


  // =========================================================
  // REGISTER
  // =========================================================

  const register = ({ name, email, password }) => {

    const existingUser = localStorage.getItem("caregiverUser");

    if (existingUser) {

      const parsedUser = JSON.parse(existingUser);

      if (parsedUser.email === email) {

        return {
          success: false,
          message: "An account with this email already exists.",
        };

      }

    }


    const newUser = {
      name,
      email,
      password,
    };


    localStorage.setItem(
      "caregiverUser",
      JSON.stringify(newUser)
    );


    return {
      success: true,
      message: "Account created successfully.",
    };

  };


  // =========================================================
  // LOGIN
  // =========================================================

  const login = (email, password) => {

    const savedUser = localStorage.getItem("caregiverUser");


    if (!savedUser) {

      return {
        success: false,
        message: "No account found. Please register first.",
      };

    }


    const registeredUser = JSON.parse(savedUser);


    if (
      registeredUser.email !== email ||
      registeredUser.password !== password
    ) {

      return {
        success: false,
        message: "Invalid email or password.",
      };

    }


    const loggedInUser = {
      name: registeredUser.name,
      email: registeredUser.email,
    };


    localStorage.setItem(
      "caregiverLoggedIn",
      JSON.stringify(loggedInUser)
    );


    setUser(loggedInUser);


    return {
      success: true,
      message: "Login successful.",
    };

  };


  // =========================================================
  // GOOGLE DEMO LOGIN
  // =========================================================

  const googleLogin = () => {

    const googleUser = {
      name: "Emma Carter",
      email: "emma.carter@gmail.com",
    };


    localStorage.setItem(
      "caregiverLoggedIn",
      JSON.stringify(googleUser)
    );


    setUser(googleUser);


    return {
      success: true,
      message: "Google demo login successful.",
    };

  };


  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = () => {

    // Remove logged-in user
    localStorage.removeItem("caregiverLoggedIn");

    // Clear React authentication state
    setUser(null);

    // Show Toastify message
    toast.success("Logged out successfully!");

  };


  return (

    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        googleLogin,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}


export function useAuth() {

  return useContext(AuthContext);

}