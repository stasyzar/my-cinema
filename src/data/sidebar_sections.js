export const SIDEBAR_SECTIONS = [
  {
    title: 'ЗА ЖАНРАМИ',
    groups: [
      {
        name: 'Фантастика та екшн',
        items: [
          { label: 'Фантастика', countKey: 'genre', value: 'Фантастика' },
          { label: 'Пригоди', countKey: 'genre', value: 'Пригоди' },
          { label: 'Екшн', countKey: 'genre', value: 'Екшн' },
        ],
      },
      {
        name: 'Драма та трилер',
        items: [
          { label: 'Драма', countKey: 'genre', value: 'Драма' },
          { label: 'Трилер', countKey: 'genre', value: 'Трилер' },
        ],
      },
      {
        name: 'Сімейне кіно',
        items: [
          { label: 'Комедія', countKey: 'genre', value: 'Комедія' },
          { label: 'Анімація', countKey: 'genre', value: 'Анімація' },
        ],
      },
    ],
  },
  {
    title: 'ЗА КІНОЗАЛАМИ ТА ФОРМАТАМИ',
    groups: [
      {
        name: 'Кінозали',
        items: [
          { label: '01 IMAX Laser', countKey: 'hall', value: 'IMAX Laser' },
          { label: '02 Dolby Atmos', countKey: 'hall', value: 'Dolby Atmos' },
          { label: '03 VIP Lounge', countKey: 'hall', value: 'VIP Lounge' },
        ],
      },
      {
        name: 'Формати показу',
        items: [
          { label: 'IMAX', countKey: 'format', value: 'IMAX' },
          { label: '3D', countKey: 'format', value: '3D' },
          { label: '2D', countKey: 'format', value: '2D' },
        ],
      },
    ],
  },
];