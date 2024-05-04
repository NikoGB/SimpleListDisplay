import React from "react";

const index = () => {

    const handleClickView = () => {
        // Open a new window with the specified page URL
        window.open('/ListView', '_blank');
    }

    const handleClickControl = () => {
        // Open a new window with the specified page URL
        window.open('/FormView', '_blank');
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <button onClick={handleClickView} 
                className="bg-primary hover:bg-secondary text-white text-[3vw] font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline mr-4" >
                Abrir Vista
            </button>

            <button onClick={handleClickControl} 
                className="bg-primary hover:bg-secondary text-white text-[3vw] font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline" >
                
                Abrir Control
            </button>
        </div>
    );
};

export default index;
