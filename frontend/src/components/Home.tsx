
type HomeProps = {
    isActive: number
}
export default function Home(props: HomeProps) {

    if (props.isActive !== 0) return null;

    return (
        <div>
            <h1>Welcome Home</h1>
        </div>
    )
}
