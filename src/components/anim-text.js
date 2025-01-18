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
          gap: '30px',
        }}
      >
        <div class="terminal-message">
          <div class="text-gray">[12/15/24] DATASET EXPANSION</div>
          <div class="terminal-message_padding">
            <div class="text-gray">• Added 3.2M training samples</div>
            <div class="text-gray">• Integrated new knowledge domains</div>
            <div class="text-green">STATUS: COMPLETE</div>
          </div>
        </div>

        <div class="terminal-message">
          <div class="text-gray">[12/16/24] SECURITY PATCH</div>
          <div class="terminal-message_padding">
            <div class="text-gray">
              • Fixed vulnerability in encryption layer
            </div>
            <div class="text-gray">• Updated firewall protocols</div>
            <div class="text-red">STATUS: ERROR</div>
          </div>
        </div>

        {/* Дублирование для бесшовного эффекта */}

        <div class="terminal-message">
          <div class="text-gray">[12/17/24] QUANTUM CORE UPDATE</div>
          <div class="terminal-message_padding">
            <div class="text-gray">• Upgraded quantum processing units</div>
            <div class="text-gray">• Reduced latency by 23%</div>
            <div class="text-yellow">STATUS: IN_PROGRESS</div>
          </div>
        </div>

        <div class="terminal-message">
          <div class="text-gray">[12/18/24] NEURAL OPTIMIZATION</div>
          <div class="terminal-message_padding">
            <div class="text-gray">• Enhanced pattern recognition</div>
            <div class="text-gray">• Improved response accuracy to 99.2%</div>
            <div class="text-green">STATUS: COMPLETE</div>
          </div>
        </div>
      </div>
    </div>
  );
};
