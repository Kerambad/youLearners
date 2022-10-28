import useActiveComponent from '../hooks/useActiveComponent';

export default function Navbar() {
    const {renderComponent} = useActiveComponent();

    return (
        <div className='container text-center'>
            <nav className="navbar fixed-bottom bg-dark">
                <div className="container-fluid">
                    <button className="btn btn-outline-light" type="button" onClick={() => renderComponent(1)}>Add</button>
                    <button className="btn btn-outline-light" type="submit">Search</button>
                </div>
            </nav>
        </div>
    )
}
