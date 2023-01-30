import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:8000/usuarios/shuser/'
const URI2 = 'http://localhost:8000/usuarios/upuser/'

export const CompEditUser = () => {
    const [nomuser, setTitle] = useState('')    
    const [correo, setContent] = useState('')   
    const [password, passContent] = useState('')   
    const navigate = useNavigate()
    const {id} = useParams()
    console.log('el valor del id es : ', id)
    //procedimiento para actualizar
    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.put(URI2+id, {
            nomuser: nomuser,
            correo: correo,
            password: password
        })
        navigate('/users')
    }

  

    const getBlogById = async () => {
        const res = await axios.get(URI+id)
        setTitle(res.data.nomuser)
        setContent(res.data.correo)
        passContent(res.data.password)
    }

    useEffect( ()=>{
        getBlogById()
     },[ ] )
    return (
        <div>
        <h3>Editar Usuario</h3>
        <form>
    
            <div>
                <label >Nombre</label>
                <input
                    value={nomuser}
                    onChange={ (e)=> setTitle(e.target.value)}
                    type="text"
                                         
                />
            </div>
            <div>
                <label>Correo</label>
                <input
                    value={correo}
                    onChange={ (e)=> setContent(e.target.value)} 
                    type="text"
                   
                />
            </div>
       
            <div>
                <label >Password</label>
                <input
                    value={password}
                    onChange={ (e)=> passContent(e.target.value)}
                    type="text"
                                       
                />
            </div>            
            <button type="submit" onClick={onSubmit} >Actualizar</button>
        </form>
    </div>
    )

}

export default CompEditUser