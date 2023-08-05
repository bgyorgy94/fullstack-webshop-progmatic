import { useEffect, useState } from 'react';
import useProducts from '../../hooks/useProducts'
import './DropDownSorter.css'

export default function DropDownSorter() {

    const { searchParams, userOrderBy } = useProducts();
    const [dropdownValue, setDropdownValue] = useState();

    useEffect(() => {
        if(!searchParams.get('orderBy')) {
            setDropdownValue('none');
        }
    }, [searchParams])

    function dropdownHandler(e) {
        let newSorting = e.target.value
        setDropdownValue(newSorting);
        userOrderBy(newSorting);
    };

    return (
        <div className="form-floating">
                <select value={dropdownValue} onChange={dropdownHandler} className="form-select" id="floatingSelectGrid">
                    <option defaultValue={"none"} >Alapértelmezett</option>
                    <option value={"priceAsc"}>Ár szerint növekvő</option>
                    <option value={"priceDesc"}>Ár szerint csökkenő</option>
                    <option value={"titleAsc"}>Név szerint növekvő</option>
                    <option value={"titleDesc"}>Név szerint csökkenő</option>
                </select>
                <label htmlFor="floatingSelectGrid">Rendezés</label>
        </div>
    )
}