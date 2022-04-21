import { useState, useEffect } from 'react';
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';
import { useParams } from 'react-router-dom';

const PRIORIDAD = ['Baja', 'Media', 'Alta'];

const ModalFormularioTareas = () => {
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [prioridad, setPrioridad] = useState('');

    const params = useParams();


    const {modalFormularioTarea, handleModalTarea, mostrarAlerta, alerta, submitTarea, tarea} = useProyectos();

    useEffect(() => {
        if(tarea?._id) {
            setId(tarea._id);
            setNombre(tarea.nombre);
            setDescripcion(tarea.descripcion);
            setFechaEntrega(tarea.fechaEntrega?.split('T')[0]);
            setPrioridad(tarea.prioridad);
            return;
        }
        setId('');
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setPrioridad('');
    }, [tarea]);

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, descripcion, fechaEntrega, prioridad].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son Obligatorios',
                error: true
            });
            return
        }
        await submitTarea({id, nombre, descripcion, fechaEntrega, prioridad, proyecto: params.id});
        setId('');
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setPrioridad('');

    } 

    const {msg} = alerta;

    return (
        <>
            {modalFormularioTarea ? (
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            {id ? 'Editar Tarea' : 'Crear Tarea'}
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={handleModalTarea}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            
                        </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            {msg && <Alerta alerta={alerta} />}
                        <form 
                            onSubmit={handleSubmit}
                            className="my-5"
                        >

                            <div className='mb-5'>
                                <label
                                    className='text-gray-700 uppercase font-bold text-sm'
                                    htmlFor='nombre'
                                >
                                    Nombre Tarea:
                                </label>
                                <input 
                                    type="text" 
                                    id='nombre'
                                    placeholder='Nombre de la Tarea'
                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>

                            <div className='mb-5'>
                                <label
                                    className='text-gray-700 uppercase font-bold text-sm'
                                    htmlFor='descripcion'
                                >
                                    Descripcion Tarea:
                                </label>
                                <textarea
                                    id='descripcion'
                                    placeholder='Descripcion de la Tarea'
                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                    value={descripcion}
                                    onChange={e => setDescripcion(e.target.value)}
                                />
                            </div>

                            <div className='mb-5'>
                                <label
                                    className='text-gray-700 uppercase font-bold text-sm'
                                    htmlFor='fecha-entrega'
                                >
                                    Fecha Entrega:
                                </label>
                                <input 
                                    type="date" 
                                    id='fecha-entrega'
                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                    value={fechaEntrega}
                                    onChange={e => setFechaEntrega(e.target.value)}
                                />
                            </div>

                            <div className='mb-5'>
                                <label
                                    className='text-gray-700 uppercase font-bold text-sm'
                                    htmlFor='prioridad'
                                >
                                    Prioridad:
                                </label>
                                <select
                                    id='prioridad'
                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                    value={prioridad}
                                    onChange={e => setPrioridad(e.target.value)}
                                >
                                    <option>-- Seleccionar --</option>
                                    {PRIORIDAD.map(opcion => (
                                        <option key={opcion}>{opcion}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleModalTarea}
                            >
                                Cancelar
                            </button>
                            <input
                                type="submit"
                                className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
                                value={id ? 'Guardar Cambios' : 'Crear Tarea'}
                            />                                        
                        </div>
                        </form>
                        </div>
                        {/*footer*/}
                        
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
  );
}

export default ModalFormularioTareas;