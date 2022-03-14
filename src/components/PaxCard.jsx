export default function PaxCard({ adults, children, isRequested }) {
    return (
        <div className="PaxCard">
            <h3>Adults: {adults}</h3>
            <h3>Children: {children}</h3>
            {isRequested && (<p>Already requested to be hosted</p>)}
        </div>
    )
}