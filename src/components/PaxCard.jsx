export default function PaxCard({ adults, children }) {
    return (
        <div className="PaxCard">
        <h3>Adults: {adults}</h3>
        <h3>Children: {children}</h3>
        </div>
    )
}