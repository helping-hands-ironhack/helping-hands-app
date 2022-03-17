export default function PaxCard({ title, adults, children, isRequested }) {
    return (
        <div className="PaxCard">
            <h4>{title}</h4>
            <div>
                <p>Adults: {adults}</p>
                <p>Children: {children}</p>
            </div>
            {isRequested && (<p>Already requested to be hosted</p>)}
        </div>
    )
}