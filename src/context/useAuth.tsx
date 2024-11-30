'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "nextjs-toploader/app";
import { UserData } from "@/interface/profile";
import { app } from "@/firebase/firebase";
import { SessionProvider, signIn } from "next-auth/react";
import { register } from "@/actions/register";

type values = {
    user: UserData;
    popup: { type: string, msg: string };
    loading: boolean;
    setPopup: (aug0: values["popup"]) => void;
    login: (email: string, password: string, callbackUrl: string) => void; 
    signUp: (data: { email: string, password: string, fullname: string, role: string }) => void;
    sociallogin: (type: string) => void;
    logOut: () => void;
}

export const AuthContext = createContext({} as values);

const auth = getAuth(app)

const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [popup, setPopup] = useState({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const formatError = (msg: string) => {
        return msg.replace("Firebase: Error (auth/", "").replace("-", " ").replace(")", "")
    }

    const login = async (email: string, password: string, callbackUrl: string) => {
        setLoading(true)
        const res = await signIn("credentials", { email, password, redirect: false });
        if(res?.ok) {
            setPopup({ type: "success", msg: "Login Successful" })
            setLoading(false)
            router.push(callbackUrl ? callbackUrl : "/dashboard")
        }
        if(res?.error) {
            setPopup({ type: "error", msg: formatError(res.error as string) })
            setLoading(false)
        }
    }

    const signUp = (data: { email: string, password: string, fullname: string, role: string }) => {
        setLoading(true)
        register(data)
        .then(() => {
            setLoading(false)
            setPopup({ type: "success", msg: "Signup Successful, Please login to continue" })
            router.push("/login")
        })
        .catch((error: { message: string }) => {
            setPopup({ type: "error", msg: formatError(error.message) })
            setLoading(false)
        });
    }
    
    const sociallogin = (type: string) => {
        setLoading(true)
        console.log(type)
        // if(type === "Google") {
        //     const provider = new GoogleAuthProvider()
        //     loginWithPopup(auth, provider)
        //     .then(() => {
        //         // const credential = GoogleAuthProvider.credentialFromResult(result);
        //         // const token = credential?.accessToken;
        //         // const user = result.user
        //         setPopup({ type: "success", msg:  "Login Successful" })
        //         setLoading(false)

        //     })
        //     .catch((error: { message: string }) => {
        //         setPopup({ type: "error", msg: formatError(error.message) })
        //         setLoading(false)
        //     })
        // }
    }

    const logOut = () => {
        signOut(auth)
        .then(() => {
            setPopup({ type: "success", msg:  "Logout Successful" })
          }).catch((error: { message: string }) => {
            setPopup({ type: "error", msg: formatError(error.message) })
          });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    }, [setUser]);

    useEffect(() => {
        if (popup?.type === "success") {
            toast.success(popup.msg)
        }
        if (popup?.type === "error") {
            toast.error(popup.msg);
        }
      }, [popup]);

    return (
        <AuthContext.Provider value={{ user, popup, loading, setPopup, login, signUp, sociallogin, logOut }}>
            <Toaster containerClassName="p-8" />
            <SessionProvider>
                {children}
            </SessionProvider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;