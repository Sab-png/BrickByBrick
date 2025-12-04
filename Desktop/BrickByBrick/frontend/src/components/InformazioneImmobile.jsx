/**
 * @fileoverview Sezione dettagli tecnici immobile (superficie, locali, bagni, ecc.).
 * 
 * @module InformazioneImmobile
 * @requires react-icons/fa
 */

import { 
    FaHome, 
    FaExpandArrowsAlt, 
    FaDoorOpen, 
    FaBed, 
    FaBath, 
    FaLayerGroup, 
    FaCar 
} from "react-icons/fa";

export default function InformazioneImmobile({ immobile, caratteristiche }) {
    return (
        <div className="dettaglio-immobile__details-section">
            <h2 className="dettaglio-immobile__section-title">Dettagli</h2>
            <div className="dettaglio-immobile__details-grid">
                
                {caratteristiche?.tipologia && (
                    <div className="dettaglio-immobile__detail-item">
                        <FaHome className="detail-icon" />
                        <div>
                            <strong>Tipologia</strong>
                            <span>{caratteristiche.tipologia}</span>
                        </div>
                    </div>
                )}

                <div className="dettaglio-immobile__detail-item">
                    <FaExpandArrowsAlt className="detail-icon" />
                    <div>
                        <strong>Superficie</strong>
                        <span>{immobile.superficie} m²</span>
                    </div>
                </div>

                <div className="dettaglio-immobile__detail-item">
                    <FaDoorOpen className="detail-icon" />
                    <div>
                        <strong>Locali</strong>
                        <span>{immobile.locali}</span>
                    </div>
                </div>

                {caratteristiche?.camere && (
                    <div className="dettaglio-immobile__detail-item">
                        <FaBed className="detail-icon" />
                        <div>
                            <strong>Camere</strong>
                            <span>{caratteristiche.camere}</span>
                        </div>
                    </div>
                )}

                {caratteristiche?.bagni && (
                    <div className="dettaglio-immobile__detail-item">
                        <FaBath className="detail-icon" />
                        <div>
                            <strong>Bagni</strong>
                            <span>{caratteristiche.bagni}</span>
                        </div>
                    </div>
                )}

                {caratteristiche?.piano !== undefined && (
                    <div className="dettaglio-immobile__detail-item">
                        <FaLayerGroup className="detail-icon" />
                        <div>
                            <strong>Piano</strong>
                            <span>{caratteristiche.piano}</span>
                        </div>
                    </div>
                )}

                {caratteristiche?.box_auto > 0 && (
                    <div className="dettaglio-immobile__detail-item">
                        <FaCar className="detail-icon" />
                        <div>
                            <strong>Box Auto</strong>
                            <span>{caratteristiche.box_auto}</span>
                        </div>
                    </div>
                )}

                {caratteristiche?.balcone > 0 && (
                    <div className="dettaglio-immobile__detail-item">
                        <FaDoorOpen className="detail-icon" />
                        <div>
                            <strong>Balconi</strong>
                            <span>{caratteristiche.balcone}</span>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}