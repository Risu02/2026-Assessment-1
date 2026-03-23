import { useState, useEffect, useContext } from "react"
import { NavContext } from "./App"

let hasLoaded = false

export default function Welcome() {
    const [stage, setStage] = useState(() => hasLoaded ? 'ready' : 'connecting')
    const [connectText, setConnectText] = useState('')
    const [progress, setProgress] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [termText, setTermText] = useState('')
    const [staticFlash, setStaticFlash] = useState(false)

    const { setNavLocked } = useContext(NavContext)

    const connectMsg = "CONNECTING TO FOUNDATION SERVER..."
    const fullText = "Welcome, █████. You have been granted Level ??? clearance to access the following classified SCP entries. Select a file from the navigation panel to begin your briefing."

    const now = new Date()
    const lastLogin = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`

    // Connecting message
    useEffect(() => {
        if (hasLoaded) return
        let i = 0
        const interval = setInterval(() => {
            setConnectText(connectMsg.slice(0, i + 1))
            i++
            if (i >= connectMsg.length) {
                clearInterval(interval)
                setTimeout(() => setStage('loading'), 600)
            }
        }, 40)
        return () => clearInterval(interval)
    }, [])

    // Progress bar
    useEffect(() => {
        if (stage !== 'loading') return
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval)
                    setLoaded(true)
                    setStage('ready')
                    setNavLocked(false)
                    hasLoaded = true
                    return 100
                }
                return Math.min(p + Math.floor(Math.random() * 8) + 2, 100)
            })
        }, 80)
        return () => clearInterval(interval)
    }, [stage])

    // Typewriter
    useEffect(() => {
        if (stage !== 'ready') return
        let i = 0
        const interval = setInterval(() => {
            setTermText(fullText.slice(0, i + 1))
            i++
            if (i >= fullText.length) clearInterval(interval)
        }, 22)
        return () => clearInterval(interval)
    }, [stage])

    // Static flash
    useEffect(() => {
        if (stage !== 'ready') return
        const interval = setInterval(() => {
            setStaticFlash(true)
            setTimeout(() => setStaticFlash(false), 120)
        }, 7000)
        return () => clearInterval(interval)
    }, [stage])

    return (
        <div className="welcome-page">
            {staticFlash && <div className="static-flash" />}
            <div className="welcome-inner">
                <div className="welcome-site-id">FOUNDATION INTRANET — SITE-01 TERMINAL — v6.6.6</div>
                <h1 className="welcome-title">SCP FOUNDATION</h1>
                <p className="welcome-subtitle">SECURE · CONTAIN · PROTECT</p>
                <div className="welcome-divider" />

                {stage === 'connecting' && (
                    <div className="loading-block">
                        <p className="loading-label">{connectText}<span className="cursor">▌</span></p>
                    </div>
                )}

                {stage === 'loading' && (
                    <div className="loading-block">
                        <p className="loading-label">LOADING FOUNDATION DATABASE...</p>
                        <div className="progress-bar-track">
                            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                        </div>
                        <p className="loading-pct">{progress}%</p>
                    </div>
                )}

                {stage === 'ready' && (
                    <>
                        <p className="welcome-last-login">LAST ACCESS: {lastLogin} — LAT: ██.████ LONG: ██.████</p>
                        <p className="welcome-text">{termText}<span className="cursor">▌</span></p>
                    </>
                )}

                <div className="welcome-footer-details">
                    <span>DO NOT DISTRIBUTE</span>
                    <span>DOC-SITE02-████-OMEGA</span>
                    <span>CLEARANCE: LEVEL ???</span>
                </div>
                <p className="welcome-warning">
                    ⚠ UNAUTHORIZED ACCESS IS PUNISHABLE UNDER FOUNDATION PROTOCOL 12-B
                </p>
            </div>
        </div>
    )
}
