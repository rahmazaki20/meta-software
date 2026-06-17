function ProductCard({ product }) {
  return (
    <div className="card">
      <div className="image-wrapper">
        <img
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="card-content">
        <span className="category">
          {product.category}
        </span>

        <h3>{product.title}</h3>

        <p className="price">
          ${product.price}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;