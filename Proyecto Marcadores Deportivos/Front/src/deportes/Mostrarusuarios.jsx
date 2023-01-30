import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
//import styles from "./styles.module.css";
import Table from 'react-bootstrap/Table';
import { FaTrashAlt, FaRegEdit, FaFileContract } from 'react-icons/fa';
import { BsArrowsAngleContract, BsPlusCircleFill } from "react-icons/bs";
import Swal from 'sweetalert2'

const URI = 'http://localhost:8000/usuarios/shuser/'
const URI2 = 'http://localhost:8000/usuarios/deluser/'

export const CompShowUsers = () => {
     useEffect( ()=> {
        falerta()
     })
     const falerta = () => {
        Swal.fire("Este es un ejemplo de Alert")
     }
    

    //Aca inicia el código que envia el encabezado del Token
    const token1 = localStorage.getItem("auth")
    const token = `${token1}`;
    const beer = "Bearer"
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'accept': 'application/json',
          //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njk0NjcxMzgsImV4cCI6MTY2OTQ2ODkzOH0.Dp0FfAN_taNOtPRhOGeAB7nQZvMvzVddPhN4TKb3JJo',
         'Authorization': `${beer} ${token}`,
        }
    };


    //Aca Finaliza
    
    const [users, setBlog] = useState([])
    useEffect( ()=>{
        getBlogs()
    },[])

    //procedimineto para mostrar todos los registros
    const getBlogs = async () => {
        const res = await axios.get(URI,axiosConfig)
        setBlog(res.data)
    }

    //procedimineto para eliminar un registro
    const deleteBlog = async (id) => {
       await axios.delete(`${URI2}${id}`)
       getBlogs()
    }

    return(
        <div >
            <div >
                <div >
                    <Link to="/create" className='btn btn-primary mt-2 mb-2'><BsPlusCircleFill  size = "35" color = "red" /></Link>
                    <Table striped bordered hover size="sm">
                        <thead >
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            { users.map ( (blog) => (
                                <tr key={ blog._id}>
                                    <td > { blog.nomuser } </td>
                                    <td > { blog.correo } </td>
                                    
                                    <td>
                                        <Link to={`/editevento/${blog._id}`} className=''><FaRegEdit size = "30" color = "blue" /></Link>
                                    </td>
                                    <td>    
                                        <button onClick={ () => deleteBlog(blog._id) } className='btn btn-danger'><FaTrashAlt /> </button>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </Table>
                </div>    
            </div>
        </div>
    )

}

export default CompShowUsers