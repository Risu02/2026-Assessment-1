export default function Scp(props) {
    const { item, name, category, image, description, containment } = props;
    const categoryColor = {
        'SAFE': '#4ecdc4',
        'EUCLID': '#f7b731',
        'KETER': '#ff3333',
    }[category] || '#aaa';

    const threatLevel = { 'SAFE': 1, 'EUCLID': 2, 'KETER': 3 }[category] || 1;

    const now = new Date();
    const docDate = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    const docNum = `DOC-${item.replace('SCP-','')}-${Math.abs(item.split('').reduce((a,c) => a + c.charCodeAt(0), 0) * 7) % 9000 + 1000}`;

    return (
        <div className="scp-inner">
            <div className="classified-stamp">CLASSIFIED</div>
            <h1>{item}: {name}</h1>
            <span className="category-badge" style={{ background: categoryColor + '22', color: categoryColor, borderColor: categoryColor }}>
                ◈ {category}
            </span>

            <div className="threat-bar-wrapper">
                <span className="threat-label">THREAT LEVEL</span>
                <div className="threat-bar">
                    <div className="threat-fill" style={{ width: `${(threatLevel / 3) * 100}%`, background: categoryColor }} />
                </div>
                <span className="threat-label">{category}</span>
            </div>

            <div className="scp-image-wrapper">
                <img src={image} alt={item} />
                <div className="scanlines" />
            </div>

            <p><strong>Description:</strong> {description}</p>
            <hr className="scp-divider" />
            <p><strong>Containment:</strong> {containment}</p>

            <div className="scp-footer">
                <span>DOCUMENT: {docNum}</span>
                <span>LAST UPDATED: {docDate}</span>
                <span>SCP FOUNDATION — INTERNAL USE ONLY</span>
            </div>

        </div>
    )
}