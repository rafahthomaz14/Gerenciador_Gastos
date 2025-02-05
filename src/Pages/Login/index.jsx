import { Link } from 'react-router-dom'
import { useState } from 'react'
import './styles.css'

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navigate = useNavigate()

    async function Login(e) {
        e.preventDefault()

        // verificação para nao ter erro no login
        if (email !== '' && senha !== '') {
            await signInWithEmailAndPassword(auth, email, senha)
                .then(() => {
                    // fez o login vai navegar direto para o formulario
                    navigate('/Formulario', { replace: true })
                })
                .catch(() => {
                    toast.error('Erro ao fazer login')
                })
        } else {
            toast.warning('Preencha os campos')
        }


    }
    return (
        <>
            <ToastContainer autoClose={3000} />

            <div className="container">
                <h1>Login</h1>
                <span>Gerêncie seus gastos de forma facil !</span>
                <form className='form' onSubmit={Login}>
                    <input type="text" placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='*******' value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <button type='submit'>Acessar</button>
                </form>

                <Link className='link' to="/Register">
                    Nao possui uma conta? Cadastre-se
                </Link>
            </div>
        </>
    )
}