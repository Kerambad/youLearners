type NavbarProps = {
    setRenderComponentFunction: (inputNumber: number) => void
}

export default function Navbar(props: NavbarProps) {
    
    return (

            <nav className="navbar fixed-bottom bg-dark">
                <div className="container-fluid">
                    <button className="btn btn-outline-light" type="button" onClick={() => props.setRenderComponentFunction(0)}>VideoMarks</button>
                    <button className="btn btn-outline-light" type="button" onClick={() => props.setRenderComponentFunction(1)}>Add</button>
                    <button className="btn btn-outline-light" type="button" onClick={() => props.setRenderComponentFunction(3)}>Bookmarks</button>
                    <button className="btn btn-outline-light" type="button" onClick={() => props.setRenderComponentFunction(2)}>History</button>
                </div>
            </nav>

    )
}
