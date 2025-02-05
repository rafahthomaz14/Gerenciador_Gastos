import { Link } from 'react-router-dom'
import { useState } from 'react'

import {auth} from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navigate = useNavigate()

    async function Register(e) {
        e.preventDefault()

        // verificação para nao ter erro no login
        if (email !== '' && senha !== '') {
            await createUserWithEmailAndPassword(auth,email,senha)
            .then(()=>{
                navigate('/Formulario',{replace:true})
            })
        } else {
            alert('Preencha os campos')
        }


    }
    return (
        <>
            <div className="container">
                <h1>Cadastre-se</h1>
                <span>Vamos criar sua conta!</span>

                <form className='form' onSubmit={Register}>
                    <input type="text" placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='*******' value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <button type='submit'>Cadastrar</button>
                </form>

                <Link className='link' to="/">
                    Já possui uma conta? Faça login!
                </Link>
            </div>
        </>
    )
}