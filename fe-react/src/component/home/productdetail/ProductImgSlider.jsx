import Gallery from "react-image-gallery";
import "./style.css";
import 'react-image-gallery/styles/css/image-gallery.css';
function ProductImgSlider() {
    const images = [
        {
            original: 'https://routine.vn/media/catalog/product/cache/e78fcb931fd36e972f6051c94f188557/1/0/10f22jacw012_beige-ao-khoac-nu_4__2.jpg',
            thumbnail: 'https://routine.vn/media/catalog/product/cache/e78fcb931fd36e972f6051c94f188557/1/0/10f22jacw012_beige-ao-khoac-nu_4__2.jpg',
            description: 'Description 1',
        },
        {
            original: 'https://routine.vn/media/catalog/product/cache/e78fcb931fd36e972f6051c94f188557/1/0/10f22jacw012_beige-ao-khoac-nu_4__2.jpg',
            thumbnail: 'https://routine.vn/media/catalog/product/cache/e78fcb931fd36e972f6051c94f188557/1/0/10f22jacw012_beige-ao-khoac-nu_4__2.jpg',
            description: 'Description 2',
        }, {
            original: 'https://routine.vn/media/catalog/product/cache/e78fcb931fd36e972f6051c94f188557/1/0/10f22jacw012_beige-ao-khoac-nu_4__2.jpg',
            thumbnail: 'https://routine.vn/media/catalog/product/cache/e78fcb931fd36e972f6051c94f188557/1/0/10f22jacw012_beige-ao-khoac-nu_4__2.jpg',
            description: 'Description 2',
        },
        // Add more images as needed
    ];
    return (
        <div className="slider-img">
            <Gallery items={images} />
        </div>
    );
}

export default ProductImgSlider;



