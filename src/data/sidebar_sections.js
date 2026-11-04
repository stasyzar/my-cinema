export const SIDEBAR_SECTIONS = [
  {
    title: 'ЗА ЖАНРАМИ',
    groups: [
      {
        name: 'Фантастика та екшн',
        items: [
          { label: 'Фантастика', to: '/?genre=Фантастика', countKey: 'genre', value: 'Фантастика' },
          { label: 'Пригоди', to: '/?genre=Пригоди', countKey: 'genre', value: 'Пригоди' },
          { label: 'Екшн', to: '/?genre=Екшн', countKey: 'genre', value: 'Екшн' },
        ],
      },
      {
        name: 'Драма та трилер',
        items: [
          { label: 'Драма', to: '/?genre=Драма', countKey: 'genre', value: 'Драма' },
          { label: 'Трилер', to: '/?genre=Трилер', countKey: 'genre', value: 'Трилер' },
        ],
      },
      {
        name: 'Сімейне кіно',
        items: [
          { label: 'Комедія', to: '/?genre=Комедія', countKey: 'genre', value: 'Комедія' },
          { label: 'Анімація', to: '/?genre=Анімація', countKey: 'genre', value: 'Анімація' },
        ],
      },
    ],
  },
  {
    title: 'ЗА КІНОЗАЛАМИ',
    groups: [
      {
        name: '01 IMAX Laser',
        items: [
          { label: 'Усі сеанси залу', to: '/?hall=IMAX Laser', countKey: 'hall', value: 'IMAX Laser' },
          { label: 'Формат IMAX', to: '/?format=IMAX', countKey: 'format', value: 'IMAX' },
        ],
      },
      {
        name: '02 Dolby Atmos',
        items: [
          { label: 'Усі сеанси залу', to: '/?hall=Dolby Atmos', countKey: 'hall', value: 'Dolby Atmos' },
          { label: 'Формат 3D', to: '/?format=3D', countKey: 'format', value: '3D' },
        ],
      },
      {
        name: '03 VIP Lounge',
        items: [
          { label: 'Усі сеанси VIP', to: '/?hall=VIP Lounge', countKey: 'hall', value: 'VIP Lounge' },
        ],
      },
    ],
  },
];