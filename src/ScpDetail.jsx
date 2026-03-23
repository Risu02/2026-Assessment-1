import { scpdata } from './scpdata'
import { useParams, Link } from "react-router-dom"
import Scp from './Scp.jsx'

export default function ScpDetail() {
    const { id } = useParams();
    const scp = scpdata.find(s => s.item === id)

    if (!scp) {
        return (
            <div className="scp-item">
                <p>SCP not found.</p>
                <div className="back-link-container">
                    <Link to="/" className="back-link">← Main</Link>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="scp-item">
                <Scp {...scp} />
            </div>
            <div className="back-link-container">
                <Link to="/" className="back-link">← Main</Link>
            </div>
        </div>
    )
}