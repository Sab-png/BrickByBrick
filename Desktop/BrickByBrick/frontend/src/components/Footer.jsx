/**
 * @fileoverview Footer principale con sezioni, link e social media.
 * Include servizi, informazioni, contatti e icone social.
 * 
 * @module Footer
 * @requires react-icons/fa
 */

import { 
    FaFacebookF, 
    FaTwitter, 
    FaInstagram, 
    FaLinkedinIn, 
    FaYoutube 
} from "react-icons/fa"; 

/**
 * Componente Footer
 * 
 * Struttura:
 * - Sezione social media con icone
 * - Colonne con link a servizi, informazioni, contatti
 * - Copyright e privacy policy
 * 
 * @component
 * @returns {JSX.Element} Footer completo
 * 
 * @example
 * <Footer />
 */
export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer__social">

                <div className="footer__social-text">
                    <span>Seguici sui nostri social:</span>
                </div>

                <div className="footer__social-links">
                    {/* Nota: Ho aggiunto la classe 'social-icon' per il CSS */}
                    <a href="#" aria-label="Facebook"><FaFacebookF className="social-icon" /></a>
                    <a href="#" aria-label="Twitter"><FaTwitter className="social-icon" /></a>
                    <a href="#" aria-label="Instagram"><FaInstagram className="social-icon" /></a>
                    <a href="#" aria-label="LinkedIn"><FaLinkedinIn className="social-icon" /></a>
                    <a href="#" aria-label="YouTube"><FaYoutube className="social-icon" /></a>
                </div>

            </div>
            
            <hr />

            <div className="footer__content">

                <div className="footer__columns">

                    <div className="footer__col">
                        <h6>Servizi</h6>
                        <p><a href="#">Vendi</a></p>
                        <p><a href="#">Valuta</a></p>
                        <p><a href="#">Case</a></p>
                        <p><a href="#">Agenti</a></p>
                    </div>

                    <div className="footer__col">
                        <h6>Azienda</h6>
                        <p><a href="#">Chi siamo</a></p>
                        <p><a href="#">Mission</a></p>
                        <p><a href="#">Storia</a></p>
                    </div>

                    <div className="footer__col">
                        <h6>Supporto</h6>
                        <p><a href="#">FAQ</a></p>
                        <p><a href="#">Reclami</a></p>
                    </div>

                    <div className="footer__col">
                        <h6>Risorse</h6>
                        <p><a href="#">Tutorial</a></p>
                        <p><a href="#">Vantaggi</a></p>
                    </div>

                    <div className="footer__col">
                        <h6>Contatti</h6>
                        <p>(+39) 23 7436 3980</p>
                        <p>Supporto@Immobiliaris.com</p>
                        <p>Via Cavour, 15</p>
                        <p>10125 Torino - Italia</p>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                Immobiliaris © 2025 | Gruppo Indomus
            </div>
        </footer>
    );
}