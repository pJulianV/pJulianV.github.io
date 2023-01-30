import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Mostramos todos los eventos deportivos
const URI = 'http://localhost:8000/usuarios/shevento/'
//Actualizar el evento deportivo
const URI2 = 'http://localhost:8000/usuarios/upevento/'

export const CompEditEvento = () => {
    const [fecha, setFecha] = useState('')    
    const [equipo1, setEquipo1] = useState('')   
    const [equipo2, setEquipo2] = useState('')   
    const [marcador1, setMarcador1] = useState('')  
    const [marcador2, setMarcador2] = useState('')  
    const [tipoevento, setTipoevento] = useState('')  
    const navigate = useNavigate()
    const {_id} = useParams()
    console.log('el valor del id es : ', _id)
    
    
    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI2+_id, {
            fecha: fecha,
            equipo1: equipo1,
            equipo2: equipo2,
            marcador1: marcador1,
            marcador2: marcador2,
            tipoevento: tipoevento
        })
        navigate('/sheventos')
    }

  

    const getBlogById = async () => {
        const res = await axios.get(URI+_id)
        setFecha(res.data.fecha)
        setEquipo1(res.data.equipo1)
        setEquipo2(res.data.equipo2)
        setMarcador1(res.data.marcador1)
        setMarcador2(res.data.marcador2)
        setTipoevento(res.data.tipoevento)
    }

    useEffect( ()=>{
        getBlogById()
     },[ ] )
    return (
        <div>
        <h3>Editar Usuario</h3>
        <form onSubmit={update}>
               <div>
                <label >Fecha</label>
                <input
                    value={fecha}
                    onChange={ (e)=> setFecha(e.target.value)}
                    type="text"                                        
                />
            </div>
            <div>
                <label>Equipo 1</label>
                <input
                    value={equipo1}
                    onChange={ (e)=> setEquipo1(e.target.value)} 
                    type="text"                  
                />
            </div>
            <div>
                <label >Equipo 2</label>
                <input
                    value={equipo2}
                    onChange={ (e)=> setEquipo2(e.target.value)}
                    type="text"                                       
                />
            </div> 
            <div>
                <label >Marcador E1</label>
                <input
                    value={marcador1}
                    onChange={ (e)=> setMarcador1(e.target.value)}
                    type="text"                                       
                />
            </div> 
            <div>
                <label >Marcador E2</label>
                <input
                    value={marcador2}
                    onChange={ (e)=> setMarcador2(e.target.value)}
                    type="text"                                       
                />
            </div>  
            <div>
                <label >Tipo Evento</label>
                <input
                    value={tipoevento}
                    onChange={ (e)=> setTipoevento(e.target.value)}
                    type="text"                                       
                />
            </div>          
            <button type="submit"  >Actualizar</button>
        </form>
    </div>
    )

}

export default CompEditEvento