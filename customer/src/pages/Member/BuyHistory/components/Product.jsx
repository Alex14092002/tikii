import { Image } from 'antd';
import classNames from 'classnames';

function Product({ product }) {
    return (
        <div
            className="flex justify-between border-b p-3 "
            style={{
                alignItems: 'center',
            }}
        >
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                    <Image src={`${product.Product.image_path}`} width={50} height={50} />
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-black select-none">{product.Product.product_name}</span>
                </div>
                <span className={classNames('font-medium text-green-500')}>
                    {product.Product.full_price.toLocaleString()} ₫
                </span>
                <span className="text-gray-500">{product.createdAt}</span>
            </div>
            <div>
                {product.is_closed === true && <h3 className={classNames('font-medium text-green-500')}>Thành công</h3>}
                {product.is_closed === null && product.event_id > 0 && <h3 className={classNames('font-medium text-orange-500')}>Đang trong sự kiện</h3>}
                {product.is_closed === null && product.event_id === null && <h3 className={classNames('font-medium text-rose-500')}>Đang treo</h3>}
            </div>
        </div>
    );
}

export default Product;
