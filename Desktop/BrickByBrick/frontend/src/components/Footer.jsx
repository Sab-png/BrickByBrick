export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer__social">

                <div className="footer__social-text">
                    <span>Seguici sui nostri social:</span>
                </div>

                <div className="footer__social-links">
                    <a href="#" aria-label="Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" aria-label="Twitter">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" aria-label="Instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" aria-label="LinkedIn">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#" aria-label="YouTube">
                        <i className="fab fa-youtube"></i>
                    </a>
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