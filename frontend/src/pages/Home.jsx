import React from "react";
import "../styles/home.css";

// Пример данных
const features = [
  {
    title: "Управление спортсменами",
    desc: "Добавляйте и редактируйте профили спортсменов легко и быстро.",
    img: "feature1.jpg",
  },
  {
    title: "Система рейтингов",
    desc: "Присваивайте рейтинги и отслеживайте прогресс ваших учеников.",
    img: "feature2.jpg",
  },
  {
    title: "Публикации в Telegraph",
    desc: "Показывайте достижения спортсменов широкой аудитории.",
    img: "feature3.jpg",
  },
];


export default function Home({ user }) {
  return (
    <div className="home">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <img src="logo.png" alt="Логотип" className="logo" />
          <span className="project-name">Название проекта</span>
        </div>
        <nav className="header-nav">
          {!user ? (
            <>
              <a href="/login" className="btn-gradient">Вход</a>
              <a href="/register" className="btn-gradient">Регистрация</a>
            </>
          ) : (
            <a href="/dashboard" className="btn-gradient">Личный кабинет</a>
          )}
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1>Удобная система для тренеров</h1>
        <p>Вносите спортсменов, присваивайте им ранги, организовывайте поединки и публикуйте карточки в Telegraph. Всё в одном удобном веб-приложении.</p>
        <img src="hero-image.jpg" alt="Спортсмены" className="hero-img" />
      </section>

      {/* FEATURES */}
      <section className="features">
        {features.map((f, idx) => (
          <div key={idx} className="card feature-card">
            <img src={f.img} alt={f.title} className="card-img" />
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Контакты: example@mail.com</p>
        <p>
          <a href="#">Политика конфиденциальности</a> |
          <a href="#">Пользовательское соглашение</a> |
          <a href="#">Информация о проекте</a>
        </p>
        <p>© 2025 Название проекта</p>
      </footer>
    </div>
  );
}
