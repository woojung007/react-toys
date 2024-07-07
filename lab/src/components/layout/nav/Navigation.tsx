import { MENUS } from "data/menus";
import { useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const navigate = useNavigate();

  const moveToPage = (e: any) => {
    navigate(e.target.id);
  };

  return (
    <div className={styles.nav}>
      <div className={styles.nav_inner}>
        {MENUS.map(({ label, path }) => (
          <button key={label} id={path} onClick={moveToPage}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
