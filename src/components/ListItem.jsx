// ListItem.jsx
import React from 'react';

const ListItem = ({ number, name, onModify, onDelete }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b">
            <span className="text-black text-left grow">{number}</span>
            <span className="text-black text-left grow">{name}</span>

            <div className='w-[20%]'>
                <button className="mx-2 px-2 py-1 bg-blue-500 text-white rounded-xl"
                    onClick={() => onModify(number)} >
                    Editar
                </button>

                <button className="mx-2 px-2 py-1 bg-red-500 text-white rounded-xl"
                    onClick={() => onDelete(number)} >
                    Borrar
                </button>
            </div>
        </div>
    );
};

export default ListItem;