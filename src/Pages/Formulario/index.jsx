import { signOut } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth, db } from "../../firebaseConnection"
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import './styles.css';
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    doc,
    where,
    deleteDoc,
    updateDoc,
} from "firebase/firestore"

import { ToastContainer, toast } from 'react-toastify';


export default function Formulario() {

    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [moeda, setMoeda] = useState('')
    const [user, setUser] = useState({})
    const [listaDescr, setListaDescr] = useState([])
    const [totalGasto, setTotalGasto] = useState(0)
    const [editDescricao, setEditDescricao] = useState({})
    useEffect(() => {
        async function carregarDescricao() {
            const userDetalhes = localStorage.getItem('@detalhesUser')
            setUser(JSON.parse(userDetalhes))

            if (userDetalhes) {
                const data = JSON.parse(userDetalhes)
                const DescricaoRef = collection(db, 'gastos')
                const q = query(DescricaoRef, where("userUid", "==", data?.uid))
                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = []
                    let total = 0
                    snapshot.forEach((doc) => {
                        const item = doc.data();
                        lista.push({
                            id: doc.id,
                            descricao: item.descricao,
                            moeda: item.moeda,
                            valor: parseFloat(item.valor),
                            userUid: item.userUid,
                        });
                        total += parseFloat(item.valor)
                    });
                    setListaDescr(lista)
                    setTotalGasto(total.toFixed(2))
                })
            }
        }
        carregarDescricao()
    }, [])

    async function Save(e) {
        e.preventDefault();

        if (descricao === '' || moeda === '' || valor === '') {
            toast.warning('Preencha todos os campos!')
            return
        }

        if (editDescricao?.id) {
            AtualizarDescr()
            return
        }

        await addDoc(collection(db, 'gastos'), {
            descricao: descricao,
            valor: valor,
            moeda: moeda,
            userUid: user?.uid
        })
            .then(() => {
                toast.success('Cadastrado com sucesso!');
                setValor('')
                setMoeda('')
                setDescricao('')
            })
            .catch((error) => {
                toast.error('Erro !', error)
            });
    }

    async function Logout() {
        await signOut(auth);
    }

    async function DeletarItem(id) {
        const docRef = doc(db, 'gastos', id)
        await deleteDoc(docRef)
        toast.success('Removido com sucesso!')
    }

    function EditarItem(item) {
        setDescricao(item.descricao)
        setMoeda(item.moeda)
        setValor(item.valor)

        setEditDescricao(item)
    }

    function handleDescricaoChange(e) {
        const inputDescricao = e.target.value
        if (inputDescricao.length <= 15) {
            setDescricao(inputDescricao)
        }
    }

    const handleChange = (e) => {
        const inputValue = e.target.value;
        if (/^\d{0,7}$/.test(inputValue)) {
            setValor(inputValue);
        }
    }


    async function AtualizarDescr() {
        const docRef = doc(db, 'gastos', editDescricao?.id)
        await updateDoc(docRef, {
            descricao: descricao,
            valor: valor,
            moeda: moeda,
        })
            .then(() => {
                toast.success('Atualizado com sucesso!')
                setDescricao('')
                setValor('')
                setMoeda('')
                setEditDescricao({})
            })
            .catch(() => {
                toast.error('Erro ao atualizar!')
                setDescricao('')
                setValor('')
                setMoeda('')
                setEditDescricao({})
            })

    }


    return (
        <>
            <ToastContainer autoClose={3000} />
            <div className="row p-5 g-0 mt-0">
                <div className="sair">
                    <button className="btn-sair" onClick={Logout}>Logoff</button>
                </div>
                <div className="card col-lg-3 col-md-12">
                    <h1>Meus Gastos</h1>
                    <label>Descrição: </label>
                    <input value={descricao} onChange={handleDescricaoChange}></input>

                    <label>Selecione: </label>
                    <select value={moeda} onChange={(e) => setMoeda(e.target.value)}>
                        <option value="">Selecione ...</option>
                        <option value="BRL">BRL</option>
                    </select>

                    <label>Valor: </label>
                    <input type="number" value={valor} onChange={handleChange} maxLength={7} />

                    {Object.keys(editDescricao).length > 0 ? (
                        <button className="btn-salvar" onClick={Save}>Atualizar</button>

                    ) : (
                        <button className="btn-salvar" onClick={Save}>Salvar</button>
                    )}

                </div>

                <div className="lista col-lg-8 col-md-12">
                    {listaDescr.length === 0 ? (
                        <p>Lista está vazia</p>
                    ) : (
                        listaDescr.map((item) => (
                            <div className="linha" key={item.id}>
                                <article>
                                    <p>{item.descricao} | {item.moeda} : R${item.valor} </p>
                                    <div className="botoes">
                                        <button onClick={() => EditarItem(item)}>Editar</button>
                                        <button onClick={() => DeletarItem(item.id)}>Excluir</button>
                                    </div>
                                </article>
                            </div>
                        ))
                    )}
                </div>

                <div className="total-container">
                    <div className="total">
                        <h1>SubTotal : R$ {totalGasto}</h1>
                    </div>
                </div>

            </div>
        </>
    );
}
