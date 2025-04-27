import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import ProductCart from "../Components/ProductCart";

const ProductDetails = () => {
    const { products, navigate, currency, addToCart } = useAppContext();
    const { id } = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const product = products.find((item) => item._id === id);
    
    useEffect(() => {
        if (products.length > 0 && product) {
            let productsCopy = [...products];

            productsCopy = productsCopy.filter((item) => 
                product.category === item.category
            );
            
            const currentProductFirst = [
                product,
                ...productsCopy.filter(item => item._id !== product._id)
            ];

            const uniqueProducts = currentProductFirst.filter(
                (item, index, self) => index === self.findIndex((t) => t._id === item._id)
            );

            const inStockProducts = uniqueProducts.filter(p => p.inStock);
            const outOfStockProducts = uniqueProducts.filter(p => !p.inStock);
            
            const combined = [...inStockProducts, ...outOfStockProducts].slice(0, 5);
            setRelatedProducts(combined);
        }
    }, [products, product]);

    useEffect(() => {
        if (product) {
            setThumbnail(product?.image?.[0] || null);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
                    <Link to="/products" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">

            <nav className="flex items-center text-sm mb-8">
                <Link to="/" className="text-gray-600 hover:text-primary transition">Home</Link>
                <span className="mx-2 text-gray-400">/</span>
                <Link to="/products" className="text-gray-600 hover:text-primary transition">Products</Link>
                <span className="mx-2 text-gray-400">/</span>
                <Link to={`/products/${product.category.toLowerCase()}`} className="text-gray-600 hover:text-primary transition">{product.category}</Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-primary font-medium">{product.name}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-12">

<div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
    {product.image.map((image, index) => (
        <div 
            key={index} 
            onClick={() => setThumbnail(image)}
            className={`flex-shrink-0 w-16 h-16 border-2 rounded-md overflow-hidden cursor-pointer transition-all ${thumbnail === image ? 'border-primary' : 'border-gray-200 hover:border-gray-300'}`}
        >
            <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
            />
        </div>
    ))}
</div>

<div className="flex-1 bg-white  p-4 rounded-lg shadow-sm border border-gray-100">
    <div className="aspect-square w-full overflow-hidden rounded-md flex justify-center">
        <img 
            src={thumbnail || product.image[0]} 
            alt={product.name}
            className="object-contain max-h-[400px] w-auto"
        />
    </div>
</div>
                <div className="w-full lg:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    
                    <div className="flex items-center mb-4">
                        <div className="flex items-center mr-2">
                            {Array(5).fill('').map((_, i) => (
                                <img 
                                    key={i}
                                    src={i < product.rating ? assets.star_icon : assets.star_dull_icon}
                                    alt=""
                                    className="w-5 h-5"
                                />
                            ))}
                        </div>
                        <span className="text-gray-600">({product.rating} reviews)</span>
                    </div>


                    <div className="mb-6">
                        <div className="flex items-baseline gap-3">
                            <p className="text-3xl font-bold text-primary">${product.offerPrice}</p>
                            {product.price > product.offerPrice && (
                                <p className="text-lg text-gray-500 line-through">${product.price}</p>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About this product</h3>
                        <ul className="space-y-2 text-gray-700">
                            {product.description.map((desc, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={() => addToCart(product._id)}
                            className="flex-1 py-3 px-6 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-300"
                        >
                            Add to Cart
                        </button>
                        <button 
                            onClick={() => {
                                addToCart(product._id);
                                navigate('/cart');
                            }}
                            className="flex-1 py-3 px-6 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 1 && (
                <div className="flex flex-col items-center mt-20">
                    <div className="flex flex-col items-center">
                        <p className="text-3xl font-medium">Related Products</p>
                        <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 w-full">
                        {relatedProducts.map((relatedProduct, index) => (
                            <ProductCart 
                                key={index} 
                                product={relatedProduct} 
                                isCurrent={relatedProduct._id === product._id}
                            />
                        ))}
                    </div>
                    
                    {relatedProducts.length >= 5 && (
                     <button 
                     onClick={() => {
                         navigate('/products');
                         scrollTo(0, 0);
                     }} 
                     className="group mx-auto px-8 py-3 my-12 border-2 border-primary text-primary font-medium rounded-full hover:bg-primary-dull hover:text-white transition-all duration-300 flex items-center gap-2"
                 >
                     See More
                    
                 </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductDetails;