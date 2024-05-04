// FormView.jsx
import React, { useEffect, useState, useRef } from 'react';
import ListItem from '../components/ListItem';

const FormView = () => {
    const [specialMsg, setSpecialMsg] = useState('Mensaje de prueba');

    const [editing, setEditing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [items, setItems] = useState([{name:"Prueba", number:10, id: Date.now() + Math.random()}]);
    const channel = new BroadcastChannel('items-channel');
    const fileInputRef = useRef(null);
    const [image, setImage] = useState('/bgExample.jpg');

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Set the image data (base64 string) to state
                setImage(reader.result)
                const data = { items: items, text: specialMsg, background: reader.result }
                channel.postMessage(data);
                localStorage.setItem('clientsData', JSON.stringify(data));
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        // Load data from localStorage when the component mounts
        const data = JSON.parse(localStorage.getItem('clientsData'));
        if (data) {
            setItems(data.items)
            setSpecialMsg(data.text)
            setImage(data.background)
            channel.postMessage(data);
        }
    }, [])

    const handleSubmitMsg = (e) => {
        e.preventDefault();

        const data = { items: items, text: specialMsg, background: image }
        channel.postMessage(data);
        localStorage.setItem('clientsData', JSON.stringify(data));

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newArray = [...items, { name, number, id: Date.now() + Math.random() }];
        setItems(newArray);
        const data = { items: newArray, text: specialMsg, background: image }
        channel.postMessage(data);
        localStorage.setItem('clientsData', JSON.stringify(data));


        setName('');
        setNumber('');
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleModify = (item, editing) => {
        if (editing === null) {
            setSelectedItem(null)
            setEditing(false)
        } else if (editing === true) {
            setSelectedItem(item)
            setEditing(true)
        } else {
            const newArray = items.map((it) => {
                if (it.id === item.id) {
                    return item;
                } else {
                    return it;
                }
            })
            setItems(newArray);
            const data = { items: newArray, text: specialMsg, background: image }
            channel.postMessage(data);
            localStorage.setItem('clientsData', JSON.stringify(data));

            setSelectedItem(null)
            setEditing(false)
        }
    };

    const handleDelete = (targetItem) => {
        const newArray = items.filter((item) => item !== targetItem);
        setItems(newArray);
        const data = { items: newArray, text: specialMsg, background: image }
        channel.postMessage(data);
        localStorage.setItem('clientsData', JSON.stringify(data));

    };

    return (
        <div className='flex justify-between mt-[4vh]'>
            <div className="w-[70%] mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg  mt-4 mb-10 mx-auto w-full flex">
                    <div className="flex justify-evenly grow py-4">
                        <div className='w-[30%]'>
                            <label className="block text-black font-bold mb-2 shadow-md" htmlFor="numero">
                                Numero
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight  focus:outline-none focus:shadow-outline"
                                id="number" type="number" placeholder="#Num" value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>

                        <div className='w-[30%]'>
                            <label className="block text-black font-bold mb-2 shadow-md" htmlFor="name">
                                Nombre
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="name" type="text" placeholder="@Nombre" value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className="bg-primary hover:bg-foreground text-white font-bold py-4 px-8 mr-0 ml-auto 
                    rounded-r-lg focus:outline-none focus:shadow-outline text-lg"

                        type="submit" >
                        AÑADIR
                    </button>
                </form>

                <div className="flex w-full mx-auto justify-center bg-white rounded-lg py-[20px] px-[10px]">
                    <div className="w-full max-h-[60vh] overflow-y-scroll ">
                        <table className="table-auto w-full border-collapse ">
                            <thead >
                                <tr className="bg-white text-black shadow-lg sticky top-0">
                                    <th className="w-3/12 px-4 py-2 text-left">#Num</th>
                                    <th className="w-6/12 px-4 py-2 text-left">@Nombre</th>
                                    <th className="w-3/12 px-4 py-2 ">Opciones</th>
                                </tr>
                            </thead>

                            <tbody >
                                {items.slice().reverse().map((item) => (
                                    ((editing && item.id === selectedItem.id &&
                                        <tr key={item.id} className="border-b border-gray-200">
                                            <td className="px-4 py-4 border-r border-gray-200">
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight  focus:outline-none focus:shadow-outline"
                                                    id="numberSel" type="number" placeholder="#Num" value={selectedItem.number}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, number: e.target.value })}
                                                />
                                            </td>
                                            <td className="px-4 py-4 border-r border-gray-200">
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="nameSel" type="text" placeholder="@Nombre" value={selectedItem.name}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                                                />
                                            </td>
                                            <td className="px-4 py-4 flex justify-center">
                                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2" onClick={() => handleModify(selectedItem, false)}>
                                                    Guardar
                                                </button>
                                                <button className="bg-warmGray-500 hover:bg-warmGray-700 text-white font-bold py-1 px-3 rounded" onClick={() => handleModify(item, null)}>
                                                    Cancelar
                                                </button>
                                            </td>
                                        </tr>)

                                        ||

                                        <tr key={item.id} className="even:bg-warmGray-100 hover:bg-warmGray-200 border-b-warmGray-200 border-b-2 transition-colors duration-200">
                                            <td className="px-4 py-4 border-r-warmGray-200 border-r-2 text-black">#{item.number}</td>
                                            <td className="px-4 py-4 border-r-warmGray-200 border-r-2 text-black">@{item.name}</td>
                                            <td className="px-4 py-4 flex justify-center">
                                                <button className="bg-primary hover:bg-foreground text-white font-bold py-1 px-3 rounded mr-2"
                                                    onClick={() => handleModify(item, true)}>
                                                    Editar
                                                </button>
                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                                    onClick={() => handleDelete(item)}>
                                                    Borrar
                                                </button>
                                            </td>
                                        </tr>
                                    )

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>


            <div className="w-[25%] mx-auto">
                <form onSubmit={handleSubmitMsg} className="bg-white shadow-md rounded-lg mt-4 mb-10 mx-auto w-full">
                    <div className="flex justify-evenly grow py-4">
                        <div className='w-[100%] mx-4 h-[30vh]'>
                            <label className="block text-black font-bold mb-2 shadow-md" htmlFor="numervdffdvo">
                                Mensaje
                            </label>
                            <textarea
                                className="resize-none  appearance-none border rounded w-full h-[25vh] py-2 px-3 leading-tight  focus:outline-none focus:shadow-outline"
                                id="spemsg" type="text" placeholder="Para Mostrar" value={specialMsg}
                                onChange={(e) => setSpecialMsg(e.target.value)}
                            />
                        </div>


                    </div>

                    <button className="bg-primary hover:bg-foreground text-white font-bold py-4 px-8 rounded-b-lg mx-0 w-full
                    focus:outline-none focus:shadow-outline text-lg"
                        type="submit" >
                        MOSTRAR
                    </button>
                </form>

                <div>
                    {/* Hide the default file input button */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        style={{ display: 'none' }}
                    />
                    {/* Custom button to trigger file upload */}
                    <button onClick={handleUploadButtonClick} className='bg-primary hover:bg-foreground text-white font-bold py-4 px-8 rounded-lg mx-0 w-full
                    focus:outline-none focus:shadow-outline text-lg cursor-pointer  appearance-none'>Subir Fondo</button>
                    {image && (
                        <div className='w-full items-center flex justify-center'>
                            <img src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />
                        </div>
                    )}
                </div>
            </div>


        </div>

    );
};

export default FormView;