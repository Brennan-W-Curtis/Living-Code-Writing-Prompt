import { FaFeatherAlt, FaCloud } from 'react-icons/fa';

const BrandLogo = () => {
    return (
        <div className="brandLogo">
            <div className="brandIcon">
                <FaFeatherAlt className="iconNegative" aria-hidden="true" />
                <FaCloud className="iconContent" aria-hidden="true" />
            </div>
            <h1>Plume</h1>
        </div>
    )
}

export default BrandLogo;