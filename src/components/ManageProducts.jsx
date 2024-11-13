import React, { useState, useEffect } from 'react';
import './ManageProducts.css';
import axios from 'axios'; 

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    product_id: '',
    product_name: '',
    cost: '',
    description: '',
    quantity: '',
    size_id: '',
    cate_id: '',
    brand_id: '',
    imageUrl: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, imageUrl: URL.createObjectURL(e.target.files[0]) });
  };

  const addProduct = async () => {
    const newProductData = {
      ...newProduct,
      product_id: products.length + 1,
    };

    try {
      const response = await axios.post('http://localhost:3000/admin/products', newProductData);
      setProducts([...products, response.data]); 
      resetForm();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const editProduct = (id) => {
    const productToEdit = products.find(product => product.product_id === id);
    setCurrentProduct(productToEdit);
    setNewProduct(productToEdit);
    setIsPopupOpen(true);
  };

  const updateProduct = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/admin/products/${currentProduct.product_id}`, newProduct);
      setProducts(products.map(product =>
        product.product_id === currentProduct.product_id ? response.data : product
      ));
      resetForm();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/products/${id}`);
      setProducts(products.filter(product => product.product_id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const resetForm = () => {
    setNewProduct({
      product_id: '',
      product_name: '',
      cost: '',
      description: '',
      quantity: '',
      size_id: '',
      cate_id: '',
      brand_id: '',
      imageUrl: '',
    });
    setCurrentProduct(null);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="manage-products-container">
      <h2>Quản lý sản phẩm</h2>
      <button className="add-button" onClick={() => setIsPopupOpen(true)}>Thêm sản phẩm</button>

      <div className="product-cards">
        {products.map(product => (
          <div className="product-card" key={product.product_id}>
            <img src={product.imageUrl} alt={product.product_name} />
            <h3>{product.product_name}</h3>
            <p>Giá: {product.cost} VNĐ</p>
            <p>Số lượng: {product.quantity}</p>
            <button className="edit-button" onClick={() => editProduct(product.product_id)}>Chỉnh sửa</button>
            <button className="delete-button" onClick={() => deleteProduct(product.product_id)}>Xóa</button>
            {currentProduct && currentProduct.product_id === product.product_id && (
              <p>{product.description}</p> 
            )}
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>{currentProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}</h3>
            <input
              type="text"
              name="product_name"
              value={newProduct.product_name}
              onChange={handleInputChange}
              placeholder="Tên sản phẩm"
            />
            <input
              type="number"
              name="cost"
              value={newProduct.cost}
              onChange={handleInputChange}
              placeholder="Giá tiền"
            />
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Mô tả"
            />
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              placeholder="Số lượng"
            />
            <input
              type="text"
              name="size_id"
              value={newProduct.size_id}
              onChange={handleInputChange}
              placeholder="ID kích cỡ"
            />
            <input
              type="text"
              name="cate_id"
              value={newProduct.cate_id}
              onChange={handleInputChange}
              placeholder="ID danh mục"
            />
            <input
              type="text"
              name="brand_id"
              value={newProduct.brand_id}
              onChange={handleInputChange}
              placeholder="ID thương hiệu"
            />
            <input
              type="file"
              onChange={handleImageChange}
            />
            {newProduct.imageUrl && (
              <img src={newProduct.imageUrl} alt="Preview" className="image-preview" />
            )}
            <div className="button-group">
              <button className="submit-button" onClick={currentProduct ? updateProduct : addProduct}>
                {currentProduct ? 'Cập nhật' : 'Thêm'}
              </button>
              <button className="close-button" onClick={resetForm}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;