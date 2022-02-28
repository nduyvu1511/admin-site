module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'shadow-1':
          '0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12), 0 3px 5px -1px rgba(0,0,0,.2)',
        'shadow-2': '0px 20px 20px rgba(126,142,177,0.12)',
        'shadow-3': '0 0 40px 0 rgb(94 92 154 / 6%)',
      },
      colors: {
        'dark-primary': '#060818',
        'dark-breadcrumb': '#1A1C2D',
        'dark-text-2': '#B1BBC8',
        'light-breadcrumb': 'FAFAFA',
        'dark-text': '#767D95',
        'dark-text-bold': '#E0E6ED',
        'light-text': '#515365',
        'light-text-bold': '#030305',
        'light-bg': 'rgba(255, 255, 255, 0.6)',
        'dark-bg-opacity': '#202837',
        'white-01': 'rgba(255, 255, 255, 0.1)',
        'white-005': 'rgba(255, 255, 255, 0.05)',
        'white-006': 'rgba(255, 255, 255, 0.06)',
        'white-007': 'rgba(255, 255, 255, 0.07)',
        'white-02': 'rgba(255, 255, 255, 0.2)',
        'modal-bg': 'rgba(0, 0, 0, 0.5)',
        'white-color': '#FAFAFA',

        'black-01': 'rgba(0, 0, 0, 0.1)',
        'black-005': 'rgba(0, 0, 0, 0.05)',
        'black-006': 'rgba(0, 0, 0, 0.06)',
        'black-007': 'rgba(0, 0, 0, 0.07)',
        'black-02': 'rgba(0, 0, 0, 0.2)',
        'black-03': 'rgba(0, 0, 0, 0.3)',
      },
      spacing: {
        '15px': '15px',
        '30px': '30px',
        'header-top': '55px',
        'header-bottom': '55px',
        'header-height': '110px',
        'sidebar-width': '220px',
      },
      keyframes: {
        slideDown: {
          '0%': { marginBottom: '50px', visibility: 'invisible', opacity: 0 },
          '100%': { marginBottom: '0px', visibility: 'visible', opacity: 1 },
        },
        animation: { 'slide-down': 'slideDown 0.5s ease-in-out' },
      },
    },
  },
  plugins: [],
};
