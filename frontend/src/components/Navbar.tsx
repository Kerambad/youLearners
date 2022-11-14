import "./Navbar.css"

type NavbarProps = {
    setRenderComponentFunction: (inputNumber: number) => void
}

export default function Navbar(props: NavbarProps) {

    return (

        <nav className="navbar fixed-bottom bg-dark">
            <div className="container-fluid">
                <ul className="buttons-select ms-md-auto gap-2">
                    <li className="nav-element">
                        <button className="btn btn-outline-light nav-button" type="button" onClick={() => props.setRenderComponentFunction(0)}>Video</button>
                    </li>
                    <li className="nav-element">
                        <button className="btn btn-outline-light nav-button" type="button" onClick={() => props.setRenderComponentFunction(1)}>Add</button>
                    </li>
                    <li className="nav-element">
                        <button className="btn btn-outline-light nav-button" type="button" onClick={() => props.setRenderComponentFunction(3)}>Marks</button>
                    </li>
                    <li className="nav-element">
                        <button className="btn btn-outline-light nav-button" type="button" onClick={() => props.setRenderComponentFunction(2)}>History</button>
                    </li>
                </ul>
            </div>
        </nav>

    )
}
