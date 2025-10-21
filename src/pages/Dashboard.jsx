import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../components/Dashboard.module.css";

// Contoh data destinasi wisata
const destinations = [
  {
    title: "Mount Fuji, Japan",
    description: "Experience the iconic mountain with scenic views and serene nature.",
    img: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80",
  },
  {
    title: "Tropical Beach",
    description: "Relax on the golden sands with crystal clear water and sunshine.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    title: "Alps Adventure",
    description: "Enjoy breathtaking alpine scenery and outdoor adventure activities.",
    img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80",
  },
  {
    title: "Bali, Indonesia",
    description: "Sunny beaches, vibrant culture, and tropical paradise.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    title: "Santorini, Greece",
    description: "White houses with blue domes overlooking the Aegean Sea.",
    img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=800&q=80",
  },
  {
    title: "Banff National Park",
    description: "Stunning mountains, crystal-clear lakes, and breathtaking trails.",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80&auto=format",
  },
];

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.welcome}>Welcome, {user?.username || user?.email}, Where do you want to go?</h1>
        <button className={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      </header>

      {/* Destinations */}
      <main className={styles.main}>
        {destinations.map((dest, index) => (
          <div key={index} className={styles.card}>
            <img src={dest.img} alt={dest.name} className={styles.cardImage} />
            <h3>{dest.name}</h3>
            <p>{dest.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
