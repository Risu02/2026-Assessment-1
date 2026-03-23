import { Link, useLocation } from "react-router-dom"
import { scpdata } from "./scpdata"

export default function NavMenu() {
    const location = useLocation()

    return (
        <nav>
            <div className="nav-header">
                <img src="/image/scp-logo.png" alt="SCP Foundation" className="nav-logo" />
                <div className="nav-title">
                    <Link to="/" className="nav-home-link">
                        <span className="nav-title-main">SCP FOUNDATION</span>
                        <span className="nav-title-sub">SECURE · CONTAIN · PROTECT</span>
                    </Link>
                </div>
                <div className="nav-clearance">CLEARANCE: LEVEL ???</div>
            </div>
            <div className="nav-links">
                {scpdata.map((scp) => (
                    <div key={scp.item} className="nav-link-item">
                        <Link
                            to={`/scp/${scp.item}`}
                            className={location.pathname === `/scp/${scp.item}` ? 'nav-active' : ''}
                        >
                            {scp.item}
                        </Link>
                    </div>
                ))}
            </div>
        </nav>
    )
}