export default function PaxCard({ title, adults, children, isRequested }) {
    console.log(title);
    return (
        <div className="PaxCard">
            <h2>{title}</h2>
            <h3>Adults: {adults}</h3>
            <h3>Children: {children}</h3>
            {isRequested && (<p>Already requested to be hosted</p>)}
        </div>
    )
}