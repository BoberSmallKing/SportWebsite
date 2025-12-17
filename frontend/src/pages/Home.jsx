import React from "react";
import "../styles/home.css";
import dashboardImg from "../assets/dashboard.png";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">

      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <span className="logo">⚔</span>
          <span className="project-name">SportRank</span>
        </div>

        <nav className="header-nav">
        {user ? (
            <a href="/dashboard" className="btn-primary">Личный кабинет</a>
        ) : (
          <>
          <a href="/login" className="btn-outline">Вход</a>
          <a href="/dashboard" className="btn-primary">Личный кабинет</a>
          </>
        )}
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Управляйте спортсменами.<br />
            <span>Показывайте результат.</span>
          </h1>

          <p>
            Современная платформа для тренеров любых видов спорта.
            Ведение спортсменов, рейтинги, поединки и публикации достижений —
            всё в одном месте.
          </p>

          <div className="hero-actions">
            <a href="/register" className="btn-primary large">
              Начать бесплатно
            </a>
            <a href="#features" className="btn-outline large">
              Как это работает
            </a>
          </div>
        </div>

        <div className="hero-image">
          <img src={dashboardImg} alt="Панель тренера" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <h2>Почему тренеры выбирают SportRank</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>👤 Спортсмены</h3>
            <p>
              Удобные карточки спортсменов: фото, достижения, рейтинг,
              история боёв.
            </p>
          </div>

          <div className="feature-card">
            <h3>🏆 Рейтинги</h3>
            <p>
              Прозрачная система лиг и званий. Рост спортсмена виден сразу.
            </p>
          </div>

          <div className="feature-card">
            <h3>⚔ Поединки</h3>
            <p>
              Организовывайте бои между учениками и сохраняйте результаты.
            </p>
          </div>

          <div className="feature-card">
            <h3>🌍 Telegraph</h3>
            <p>
              Публикация карточек спортсменов — можно показать достижения
              друзьям и тренерам.
            </p>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="advantages">
        <h2>Чем мы лучше конкурентов</h2>

        <ul className="adv-list">
          <li>✔ Подходит для любого вида спорта</li>
          <li>✔ Понятно даже детям и родителям</li>
          <li>✔ Не нужен Excel и тетради</li>
          <li>✔ Реальные достижения, а не просто слова</li>
          <li>✔ Современный интерфейс без перегруза</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Начните вести своих спортсменов правильно</h2>
        <p>Создайте аккаунт и попробуйте систему уже сегодня</p>
        <a href="/register" className="btn-primary large">
          Зарегистрироваться
        </a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 SportRank</p>
        <div className="footer-links">
          <a href="#">О проекте</a>
          <a href="#">Политика конфиденциальности</a>
          <a href="#">Контакты</a>
        </div>
      </footer>

    </div>
  );
}
