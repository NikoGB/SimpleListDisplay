// ListView.jsx
import React, { useState, useEffect, useRef } from 'react';
import ListItem from '../components/DisplayListItem';

const ListView = () => {
    const [items, setItems] = useState([]);
    const [specialMsg, setSpecialMsg] = useState('TEXTO DE PRUEBA');
    const [position, setPosition] = useState(0);
    const containerRef = useRef(null);

    const channel = new BroadcastChannel('items-channel');
    const [image, setImage] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0);

    const calculateScale = (itemIndex) => {
        // Calculate the distance of the item from the top of the viewport
        if (document.getElementById(`item-${itemIndex}`) != null) {
            const itemOffset = document.getElementById(`item-${itemIndex}`).getBoundingClientRect().top;
            // Calculate the scale based on the distance from the top of the viewport
            const scale = 1 + (((scrollPosition - itemOffset) / window.innerHeight) * 0.1);
            // Limit the scale to a maximum value (optional)
            return Math.min(scale, 1); // You can adjust the maximum scale value as needed

        }
        return 1
    };


    useEffect(() => {
        const handleUpdate = (event) => {
            setItems(event.data.items);
            setSpecialMsg(event.data.text);
            setImage(event.data.background)
        };

        channel.addEventListener('message', handleUpdate);


        const interval = setInterval(() => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const textWidth = containerRef.current.firstChild.offsetWidth;

                setPosition(prevPosition => {
                    if (prevPosition > containerWidth) {
                        return -textWidth;
                    } else {
                        return prevPosition + 1;
                    }
                });
            }
        }, 1);


        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);


        return () => {
            window.removeEventListener('scroll', handleScroll);
            channel.removeEventListener('message', handleUpdate);
            clearInterval(interval);
        };
    }, []);



    return (
        
        <div style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'
            }} 
            className='pt-[5vh]'
            >

            <div className="relative overflow-hidden bg-secondary  mb-[5vh] w-full h-[15vh]" ref={containerRef}>
                <div className="absolute top-[10%] left-0 whitespace-nowrap " style={{ transform: `translateX(${position}px)` }}>
                    <span className="inline-block center px-2 text-[8vh] text-white font-bold"> {specialMsg}</span>
                </div>
            </div>

            <div className="justify-center items-center mx-[5vw] w-[90vw] ">
                {items.slice().reverse().map((item, index) => (
                    <div key={index} id={`item-${index}`} style={{ transform: `scale(${calculateScale(index)})` }} >
                        <ListItem number={item.number} name={item.name} />

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListView;
