import { useEffect, useState } from "react"
import "./Navbar.css"

type NavbarProps = {
    setRenderComponentFunction: (inputNumber: number) => void
    activeComponent: number
}

export default function Navbar(props: NavbarProps) {

    const [buttonStyle, setButtonStyle] = useState({
        0: "btn btn-outline-light nav-button active",
        1: "btn btn-outline-light nav-button",
        2: "btn btn-outline-light nav-button",
        3: "btn btn-outline-light nav-button"
    })

    useEffect(() => {
        for (let i = 0; i < 4; i++) {
            if (props.activeComponent === i) {
                setButtonStyle(old => ({...old, [i]: "btn btn-outline-light nav-button active"}))
            }
            else {
                setButtonStyle(old => ({...old, [i]: "btn btn-outline-light nav-button"}))
            }        
        }
    }, [props.activeComponent])

    return (

        <nav className="navbar fixed-bottom bg-dark">
            <div className="container-fluid">
                <ul className={"buttons-select ms-md-auto gap-2" }>
                    {/* Video Bookmarks */}
                    <li className="nav-element">
                        <button className={buttonStyle[0]} type="button" onClick={() => props.setRenderComponentFunction(0)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-play-btn" viewBox="0 0 16 16">
                                <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                            </svg>
                        </button>
                    </li>
                    {/* Add Video */}
                    <li className="nav-element">
                        <button className={buttonStyle[1]} type="button" onClick={() => props.setRenderComponentFunction(1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </button>
                    </li>
                    {/* All Bookmarks */}
                    <li className="nav-element">
                        <button className={buttonStyle[3]} type="button" onClick={() => props.setRenderComponentFunction(3)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bookmarks" viewBox="0 0 16 16">
                                <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z" />
                                <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z" />
                            </svg>
                        </button>
                    </li>
                    {/* Favorites */}
                    <li className="nav-element">
                        <button className={buttonStyle[2]} type="button" onClick={() => props.setRenderComponentFunction(2)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>

    )
}
