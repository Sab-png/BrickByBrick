/**
 * @fileoverview Componente header principale dell'applicazione.
 * Wrapper per la navbar di navigazione.
 * 
 * @module Header
 * @requires ./Nav
 */

import Nav from "./Nav"

/**
 * Componente Header
 * 
 * Renderizza l'header semantico contenente il componente Nav.
 * 
 * @component
 * @returns {JSX.Element} Header con navigazione
 * 
 * @example
 * <Header />
 */
export default function Header() {
    return (
        <header>
            <Nav />
        </header>

    )
}