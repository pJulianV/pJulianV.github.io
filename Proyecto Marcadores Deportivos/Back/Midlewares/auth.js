import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../configs/jwtfunciones.js";

export const requireToken = (req, res, next) => {
  
    try {
        //let token = req.headers?.authorization;
       // const token = localStorage.getItem("auth");
       let token = req.headers?.authorization;
       if (!token) throw new Error("No Bearer");
     //let token = req.headers('x-auth-token');
       
     //if (!token) throw new Error("No Bearer");
 
     console.log(req.headers);
     if (!token) {
         res.status(400).json({msj : "Token no encontrado"});
     }
       token = token.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.JWTPRIVATEKEY);

        req.uid = uid;
        console.log(req.headers);
        next();
    } catch (error) {
        console.log(error.message);
        return res
            .status(401)
            .send({ error: tokenVerificationErrors[error.message] });
    }
};
export default requireToken;
