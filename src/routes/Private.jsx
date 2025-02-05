import { useState, useEffect } from "react"
import { auth } from '../firebaseConnection'
// verifica se tem usuario logado
import { onAuthStateChanged } from "firebase/auth"

import { Navigate } from "react-router-dom"

export default function Private({ children }) {

    const [carregando, setCarregando] = useState(true)
    const [logado, setLogado] = useState(false)


    useEffect(() => {
        
        async function checkLogin() {
            const unsub = onAuthStateChanged(auth, (user) => {
                //se tem usuario logado
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    }

                    localStorage.setItem("@detalhesUser", JSON.stringify(userData))
                    setCarregando(false)
                    setLogado(true)

                } else {
                    setCarregando(false)
                    setLogado(false)
                }
            })
        }
        checkLogin()
    }, [])

    if(carregando){
        return(
            <div>

            </div>
        )
    }

    //nao estiver logado
    if(!logado){
        return <Navigate to="/"/>
    }

    return children

}