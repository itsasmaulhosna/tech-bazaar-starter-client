import { AddProductsModal } from '@/components/Dashboard/seller/AddProductsModal';
import { ProductTable } from './productTable';
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;


const SellerProducts = async() => {
    const res = await fetch(`${SERVER_URL}/products`,)
    const products=await res.json()
    
    return (
        <div>
            <div className='flex justify-between items-center my-5'>
                <h1 className='text-3xl font-bold'>Products</h1>
                <AddProductsModal/>
            </div>
            <ProductTable products={products}/> 
        </div>
    );
};

export default SellerProducts;