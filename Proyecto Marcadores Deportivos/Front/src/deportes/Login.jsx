import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//aca inicia
export const Login = () => {
    const [body, setBody] = useState({ correo: '', password: '' })
    const navigate  = useNavigate()
   // const classes = useStyles()

    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        })
    }

    //********** */
       const onSubmit = async (e) => {
        e.preventDefault();
        try{

            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    
                    "Access-Control-Allow-Origin": "*",
                }
              };
            const URI = 'http://localhost:8000/usuarios/login'
        console.log("paso por aca")
        console.log (axiosConfig);
        const resp = await axios.post(URI, body, axiosConfig );
    let s = JSON.stringify(resp?.data);
    console.log ("este es mi Token arr ",s);
  
       let union1 = s.split(":")[2];
   
       let r = union1.substring(1, union1.length-3);
            console.log('Este es el JWT:',r);
           localStorage.setItem('auth',r)
            navigate('/sheventos')
              window.location = '/sheventos'
           
               
            
        }
        catch(error)  {
                navigate('/login')
               window.location = '/login'
                console.log(error)
                console.log("Paso por abajo")
            }
        }
 
//************* */

    return (
     
            
                <div className="login-form">
                   <h3>Usuarios Registrados</h3>
                   
                   <Card>
                   <Card.Body>
    
                    <Form >
                        <Form.Control
                          
                            autoFocus
                            type= "text"
                            placeholder = "Correo"
                            value= {body.correo}
                            onChange= { inputChange }
                            name= "correo"
                        />
                        <Form.Control type="password"
                            placeholder = "Password"
                            value={body.password}
                            onChange={inputChange}
                            name="password"
                        />
                        <Button className="" onClick={onSubmit} type="submit" >
                            Sign In
                        </Button>
                        <Link to="/create" className='btn-register'>Sign Up</Link>
                    </Form>
                    </Card.Body>
                    </Card>
                </div>
          
      
    )
}

export default Login;