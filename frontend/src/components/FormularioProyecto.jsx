import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [cliente, setCliente] = useState('');

    const {mostrarAlerta, alerta, submitProyecto} = useProyectos();

    const handleSubmit = async e => {
        e.preventDefault();
        if([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son Obligatorios',
                error: true
            })
            return;
        }
         await submitProyecto({nombre, descripcion, fechaEntrega, cliente});

        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setCliente('');
    }

    const {msg} = alerta;

    return (
        <form 
            className="bg-white py-10 px-5 md:w-3/4 rounded-lg shadow"
            onSubmit={handleSubmit}    
        >
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="nombre"
                >
                    Nombre Proyecto
                </label>

                <input 
                    id="nombre"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Proyecto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="descripcion"
                >
                    Descripcion del Proyecto
                </label>

                <textarea
                    id="descripcion"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripcion del Proyecto"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="fecha-entrega"
                >
                    Fecha de Entrega
                </label>

                <input 
                    id="fecha-entrega"
                    type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="cliente"
                >
                    Nombre Cliente
                </label>

                <input 
                    id="cliente"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Cliente"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>

            <input 
                type="submit" 
                value="Crear Proyecto"
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            />
        </form>
    )
}

export default FormularioProyecto