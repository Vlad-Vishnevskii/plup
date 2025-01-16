import React, { useEffect, useRef } from 'react';

export const HexagonAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hexagonRadius = 40; // Радиус шестиугольника (расстояние от центра до вершины)
    const hexagonHeight = Math.sqrt(3) * hexagonRadius; // Высота шестиугольника
    const hexagonWidth = 2 * hexagonRadius; // Ширина шестиугольника
    const horizontalStep = hexagonWidth * 0.75; // Горизонтальный шаг между центрами
    const verticalStep = hexagonHeight / 2; // Вертикальный шаг между центрами

    // Генерация координат всех шестиугольников
    const hexagons = [];
    for (let row = 0; row < Math.ceil(canvas.height / verticalStep); row++) {
      for (let col = 0; col < Math.ceil(canvas.width / horizontalStep); col++) {
        const x = col * horizontalStep;
        const y = row * verticalStep * 2 + (col % 2 === 0 ? 0 : verticalStep); // Шахматное смещение по вертикали
        hexagons.push({ x, y, filled: false, fillTime: 0 });
      }
    }

    // Функция для рисования шестиугольника
    const drawHexagon = (x, y, radius, fill = false, alpha = 1) => {
      const angle = (2 * Math.PI) / 6; // Угол поворота для шестиугольника
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const offsetX = x + radius * Math.cos(i * angle);
        const offsetY = y + radius * Math.sin(i * angle);
        if (i === 0) ctx.moveTo(offsetX, offsetY);
        else ctx.lineTo(offsetX, offsetY);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 255, 0, ${alpha})`; // Зелёный контур с прозрачностью
      ctx.lineWidth = 2;
      ctx.stroke();

      if (fill) {
        ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`; // Зелёная заливка с прозрачностью
        ctx.fill();
      }
    };

    const draw = (time) => {
      // Очищаем весь canvas (чёрный фон задаётся через стили)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Отрисовываем все шестиугольники
      hexagons.forEach((hexagon) => {
        const alpha = hexagon.filled ? 1 : 0.4; // Залитые ярче
        drawHexagon(hexagon.x, hexagon.y, hexagonRadius, hexagon.filled, alpha);

        // Зацикливание: через 2 секунды очищаем заливку
        if (hexagon.filled && time - hexagon.fillTime > 2000) {
          hexagon.filled = false;
          hexagon.fillTime = 0;
        }
      });

      // Случайно выбираем один незаполненный шестиугольник и закрашиваем его
      const emptyHexagons = hexagons.filter((hex) => !hex.filled);
      if (emptyHexagons.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyHexagons.length);
        emptyHexagons[randomIndex].filled = true;
        emptyHexagons[randomIndex].fillTime = time; // Записываем время закраски
      }

      // Продолжаем анимацию
      requestAnimationFrame(draw);
    };

    // Запуск анимации
    requestAnimationFrame(draw);

    return () => {
      // Очистка ресурсов при размонтировании
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <div style={{ background: 'black', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          background: 'transparent',
        }}
      />
    </div>
  );
};
