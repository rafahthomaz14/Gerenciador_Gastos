import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../Pages/Login'
import Form from '../Pages/Formulario'
import Register from '../Pages/Register'

import Private from './Private'

export default function Rotas() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/Register" element={<Register />}></Route>

                    <Route path="/Formulario" element={<Private> <Form /> </Private>   }></Route>
                </Routes>
            </BrowserRouter>
        </div >
    )
}