import { useState, useEffect, useMemo } from "react";
import { getProducts } from "./services/api";

import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    ...new Set(products.map((item) => item.category)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

return (
  <div className="app">
    <div className="container">
      <h1 className="title">ShopSphere</h1>
      <p className="subtitle">
        Discover amazing products with smart search & filtering
      </p>

      <div className="controls">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <h2 className="empty-state">
          No results found
        </h2>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  </div>
);
}

export default App;