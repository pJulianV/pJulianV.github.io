import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const URI = 'http://localhost:8000/usuarios/regevento'

export const CompCrearEventos = () => {
   
    const [fecha, setFecha] = useState('')
    const [equipo1, setEquipo1] = useState('')
    const [equipo2, setEquipo2] = useState('')
    const [marcador1, setMarcador1] = useState('')
    const [marcador2, setMarcador2] = useState('')
    const [tipoevento, setTipoevento] = useState('')
    const navigate = useNavigate()    
    
    //procedimiento guardar
    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI, {fecha: fecha, equipo1: equipo1, equipo2: equipo2, marcador1: marcador1, marcador2: marcador2, tipoevento:tipoevento })
        navigate('/sheventos')
    }   

    return (
        <div className="login-form" >
           <h3>Creación de  Eventos deportivos</h3>
           <Card>
                   <Card.Body>

           <Form onSubmit={store}>
                 
                <div className="login-form">

                <Form.Control
                        value={fecha}
                        onChange={ (e)=> setFecha(e.target.value)} 
                        type="text"
                       
                        placeholder = "Ingrese la fecha año/mes/dia"
                    />    
                     
                                 
                  </div>

                  <div className="login-form" >
                  <Form.Control
                        value={equipo1}
                        onChange={ (e)=> setEquipo1(e.target.value)} 
                        type="text"
                    
                        placeholder = "Ingrese el Equipo 1"
                    />    
                             
                 </div>
                 <div className="login-form">
                 
                    <Form.Control 
                        value={equipo2}
                        onChange={ (e)=> setEquipo2(e.target.value)} 
                        type = "text"
                        
                        placeholder = "Ingrese el Equipo 2"
                    />                 
                 </div>

                 <div className="login-form">
                 
                    <Form.Control
                        value={marcador1}
                        onChange={ (e)=> setMarcador1(e.target.value)} 
                        type = "text"
                        
                        placeholder = "Ingrese el marcador E1"
                    />                 
                 </div>

                 <div className="login-form">
                 
                 <Form.Control 
                     value={marcador2}
                     onChange={ (e)=> setMarcador2(e.target.value)} 
                     type = "text"
                     
                     placeholder = "Ingrese el marcador E2"
                 />                 
              </div>
              <div className="login-form">
                 
                 <Form.Control 
                     value={tipoevento}
                     onChange={ (e)=> setTipoevento(e.target.value)} 
                     type = "text"
                   
                     placeholder = "Ingrese el tipo Evento"
                 />                 
              </div>
                 <Button variant="success" type="submit" className="btn-register">Guardar</Button>                  
                 
                  
          
           </Form>
           </Card.Body>
            </Card>
        </div>
    )
}

export default CompCrearEventos;