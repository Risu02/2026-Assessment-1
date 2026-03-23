import { scpdata } from './scpdata'
import { Link } from 'react-router-dom'
import Scp from './Scp.jsx'

export default function ScpList() {
    return (
        <div>
            <h1 className="page-title">SCP Database</h1>
            <div className="scp-list">
                {scpdata.map(scp => (
                    <Link key={scp.item} to={`/scp/${scp.item}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="scp-item">
                            <Scp {...scp} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
