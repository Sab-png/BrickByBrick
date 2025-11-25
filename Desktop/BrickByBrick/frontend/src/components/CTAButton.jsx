import { Link } from "react-router-dom"

export default function CTAButton({content = "VALUTA IL TUO IMMOBILE", ctaLink = "/valuta-immobile"}) {
    return (
        <Link to={ctaLink}>
          <button className="cta-button">
            {content}
          </button>
        </Link>
    )
} 