import React from 'react';
import convert from '../../../helpers/convert';
function Product({ product, event, ...props }) {
    return (
        <div {...props} className="item-content my-3">
            <div className="product-item">
                <div className="thumb">
                    <img src={`${product.image_path}`} alt="" />
                </div>
                <div
                    className="product-info"
                    style={{
                        flex: 1,
                    }}
                >
                    <h3 className="product-name">{product.product_name}</h3>
                    <div className="price">
                        <span>{convert.toVND(product.full_price)}đ</span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <div className="box-sale pb-3">
                    <div className="sale rounded-full font-semibold bg-[f7f8fa]">
                        <span
                            style={{
                                fontSize: '14px',
                            }}
                        >
                            {`Nhận phiếu giảm giá ${product.percent_sale}`} % <br />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
