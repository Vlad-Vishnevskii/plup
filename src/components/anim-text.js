import React, { useEffect, useRef, useState } from 'react';
import '../styles.scss';

export const DynamicScrollText = () => {
  const containerRef = useRef(null); // Контейнер для текста
  const contentRef = useRef(null); // Содержимое, которое будет прокручиваться
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    // Отслеживаем изменения высоты контейнера
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === containerRef.current) {
          setContainerHeight(entry.contentRect.height);
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Применяем анимацию к содержимому после обновления высоты
    if (contentRef.current && containerHeight > 0) {
      const duration = 8; // Длительность анимации
      contentRef.current.style.animation = `scroll-text ${duration}s linear infinite`;
    }
  }, [containerHeight]);

  return (
    <div ref={containerRef} className="scroll-container">
      <div
        ref={contentRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <div>Первая строка текста</div>
        <div>Вторая строка текста</div>
        <div>Третья строка текста</div>
        <div>Четвертая строка текста</div>
        <div>Первая строка текста</div>
        <div>Вторая строка текста</div>
        <div>Третья строка текста</div>
        <div>Четвертая строка текста</div>
        {/* Дублирование для бесшовного эффекта */}
        <div>Первая строка текста</div>
        <div>Вторая строка текста</div>
        <div>Третья строка текста</div>
        <div>Четвертая строка текста</div>
        <div>Первая строка текста</div>
        <div>Вторая строка текста</div>
        <div>Третья строка текста</div>
        <div>Четвертая строка текста</div>
        <div>Первая строка текста</div>
        <div>Вторая строка текста</div>
        <div>Третья строка текста</div>
        <div>Четвертая строка текста</div>
        <div>Первая строка текста</div>
        <div>Вторая строка текста</div>
        <div>Третья строка текста</div>
        <div>Четвертая строка текста</div>
        <div>Первая строка текста</div>
        <div>Вторая строка текста</div>
        <div>Третья строка текста</div>
        <div>Четвертая строка текста</div>
        <div>Первая строка текста</div>
        <div>Вторая строка текста</div>
        <div>Третья строка текста</div>
        <div>Четвертая строка текста</div>
      </div>
    </div>
  );
};
