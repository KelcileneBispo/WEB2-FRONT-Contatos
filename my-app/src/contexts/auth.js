import React, {createContext, useContext, useState, useEffect} from 'react';
import api from "../services/api";


const AuthContext = createContext({});

export default function AuthContextComponent({children}){
    const [user, setUser] = useState(null);
    

    useEffect(() => {
        const loadStorage = async () => {
            const userStorage = await JSON.parse(localStorage.getItem('USER') !== null);
            const tokenStorage = await  JSON.parse(localStorage.getItem('TOKEN') !== null);
            if(userStorage && tokenStorage) {
                api.defaults.headers = {
                    'Content-Type': 'application/json',
                    "Auth-Token":  tokenStorage,
                } 
                console.log(userStorage);
                setUser(JSON.stringify(userStorage));
            }
        }
        loadStorage().then();
    },[]);


    async function login(email, password) {
        const response = await api.post('/users/login', {email, password});
        const {token, user} = response.data;
        console.log("chegou aqui ...")
        api.defaults.headers.common = `Auth-Token ${token}`;
        localStorage.setItem('USER', JSON.stringify(user));
        localStorage.setItem('TOKEN',JSON.stringify(token));
        setUser(user);
       

    }


    async function logout () {
        localStorage.clear(setUser(null))
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth(){
  return useContext(AuthContext);
}