import { useEffect } from 'react';
import useProducts from '../../hooks/useProducts'
import API_URL from '../../constants';
import '../ProductList/productList.scss'

export default function ProductList() {

    const { productList, getProducts, searchParams, order, currentPage, setPage, totalPages } = useProducts();

    useEffect(() => {
        getProducts();
    }, [searchParams, currentPage]);

    return (
        <div className='container bg-light bg-gradient p-3'>
            <div className='row text-center'>
                <h2>Termékek</h2>
            </div>
            <div className='row align-items-start'>
                <div className='col-md-2'>
                    <div className='my-2'>
                        <p>DropDownSorter</p>
                    </div>
                    <div>
                        <p>Filter</p>
                    </div>
                </div>
                <div className='col-md-10'>
                    <div className='row align-items-start'>
                        {productList.map((product) => {
                            return (
                                <div key={product.id} className='col-md-4'>
                                    <div className='card my-2'>
                                        <img className='card-img-top' src={API_URL + product.imagePath} />
                                        <div className='card-body'>
                                            <div className='card-text'>
                                                <h5 className='card-title'>{product.title}</h5>
                                                <h6 className='card-subtitle'>{product.price} Ft</h6>
                                            </div>
                                            <div className='container btn-container'>
                                                <button type='button' className='btn btn-primary card-btn'>Kosárba</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>



    )
}