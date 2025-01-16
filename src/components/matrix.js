import React, { useEffect, useRef } from 'react';

export const Matrix = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20); // Количество колонок текста
    const drops = Array(columns).fill(0); // Начальные позиции капель

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Прозрачный фон
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0'; // Цвет текста (зелёный)
      ctx.font = '20px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(65 + Math.random() * 58); // Генерация символа
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height || Math.random() > 0.95) {
          drops[i] = 0; // Сбрасываем каплю
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  );
};
