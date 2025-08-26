"use client";

import React from "react";

export default function YandexMap() {
  return (
    <div
      style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}
    >
      {/* Attribution links */}
      <a
        href="https://yandex.com.ge/maps/213/moscow/?utm_medium=mapframe&utm_source=maps"
        style={{
          color: "#eee",
          fontSize: "12px",
          position: "absolute",
          top: 0,
        }}
      >
        Москва
      </a>
      <a
        href="https://yandex.com.ge/maps/213/moscow/house/novoslobodskaya_ulitsa_18/Z04Ycw5pSkQHQFtvfXt5c39gYA==/?indoorLevel=1&ll=37.599848%2C55.782545&utm_medium=mapframe&utm_source=maps&z=16.73"
        style={{
          color: "#eee",
          fontSize: "12px",
          position: "absolute",
          top: 14,
        }}
      >
        Новослободская улица, 18 на карте Москвы, ближайшее метро Менделеевская
        — Яндекс Карты
      </a>

      {/* Responsive iframe */}
      <iframe
        src="https://yandex.com/map-widget/v1/?indoorLevel=1&ll=37.599848%2C55.782545&mode=whatshere&whatshere%5Bpoint%5D=37.599310%2C55.782334&whatshere%5Bzoom%5D=17&z=16.73"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
        allowFullScreen
      ></iframe>
    </div>
  );
}
