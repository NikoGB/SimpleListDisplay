// ListItem.jsx
import React from 'react';

const DisplayListItem = ({ number, name }) => {
    return (
        <div className="flex items-center justify-between p-2 w-[90vw]">
            
            <div className='rounded-md bg-white w-[20%] text-center py-3 mr-5 shadow-lg' >
                <span className="text-black font-bold text-[5vh]">{number}</span> 
            </div>

            <div className='rounded-md bg-white w-[80%]  text-center py-3 shadow-lg' >
                <span className="text-black font-thin text-[5vh]">{name}</span>
            </div>
        </div>
    );
};

export default DisplayListItem;
