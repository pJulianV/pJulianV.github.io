import mongoose from "mongoose";
const eventoSchema = new mongoose.Schema(
    {
        fecha: {
            type: Date,
            require: true
        },
        equipo1: {
            type: String,
            require: true
        },
        equipo2: {
            type: String,
            require: true
        },
        marcador1: {
            type: Number,
        },
        marcador2: {
            type: Number,
        },
        tipoevento: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
   }
);

export const evento = mongoose.model('ceventos',eventoSchema)
export default evento;
