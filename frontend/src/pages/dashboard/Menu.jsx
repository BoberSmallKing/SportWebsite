import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard/menu.css";

const Menu = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const menuItems = [
    { label: "МОЯ КОМАНДА", path: "/dashboard/team" },
    { label: "СОЗДАТЬ БОЙЦА", path: "/dashboard/create-athlete" },
    { label: "ВСЕ БИТВЫ", path: "/dashboard/fights" },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : menuItems.length - 1
        );
      } else if (e.key === "ArrowDown") {
        setSelectedIndex((prev) =>
          prev < menuItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "Enter") {
        navigate(menuItems[selectedIndex].path);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, navigate]);

  return (
    <div className="retro-container">
      <div className="retro-menu-box">
        <h1 className="retro-title">ГЛАВНОЕ МЕНЮ</h1>
        <ul className="retro-menu-list">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`retro-menu-item ${
                selectedIndex === index ? "active" : ""
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => navigate(item.path)}
            >
              {selectedIndex === index && (
                <span className="retro-arrow">▶</span>
              )}
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="retro-footer">НАЖМИТЕ КНОПКУ, ЧТОБЫ НАЧАТЬ</div>
    </div>
  );
};

export default Menu;
