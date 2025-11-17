import { useState } from "react";

const navbarItems =["statistiche","utenti","immobili","agenda"];

export const SideBar =() =>{
    const[isOpen, setIsOpen] = useState(false);
    return(
        <aside className="">
            <div className="inner">
                <header>
                    <button type="button" onClick={() => setIsOpen(!isOpen)}>
                        <span className="">
                            {isOpen ? 'Chiudi Menu' : 'Apri Menu'}
                        </span>
                    </button>
                </header>
                <nav>
                    {navbarItems.map(item=> (
                    <button key={item} type="button">
                        <span className="material...">{item}</span>
                        <p>{item}</p>
                    </button>
                    
                  ))}
                </nav>
            </div>
        </aside>
    );
};


