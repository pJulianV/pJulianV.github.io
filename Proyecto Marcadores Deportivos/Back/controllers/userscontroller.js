import { usuario } from '../models/usuario.js';

// Registrar un usuario en la abse de datos
export const regusuario = (req, res) => {
    const user = usuario(req.body);
    user
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  // Mostrar información de los usuarios

  export const showuser = (req,res) => {
 
    usuario
    .find()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error})); 
}

//Muestra la información de un usuario especifico

export const shuserone = (req, res) => {
    const { id } = req.params;
    usuario
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //Borramos un usuario

  export const deluser =  (req, res) => {
    const { id } = req.params;
    usuario
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //Actualizar un usuario
  export const upuser =  (req, res) => {
    const { id } = req.params;
    const { nomuser , password, correo } = req.body;
const user = this
const salt = bcrypt.genSaltSync(12);
const hash = bcrypt.hashSync(password, salt);
password = hash;
    usuario
      .updateOne({ _id: id }, { $set: { nomuser, password, correo } })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

 
  export default regusuario;