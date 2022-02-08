module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'shadow-1':
          '0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12), 0 3px 5px -1px rgba(0,0,0,.2)',
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
        'light-bg': '#EDEEF0',
        'dark-bg-opacity': '#202837',
        'white-01': 'rgba(255, 255, 255, 0.1)',
        'white-005': 'rgba(255, 255, 255, 0.05)',
        'white-006': 'rgba(255, 255, 255, 0.06)',
        'white-007': 'rgba(255, 255, 255, 0.07)',
        'white-02': 'rgba(255, 255, 255, 0.2)',
        'white-03': 'rgba(255, 255, 255, 0.3)',
      },
      spacing: {
        '15px': '15px',
        '30px': '30px',
        'header-top': '55px',
        'header-bottom': '55px',
        'header-height': '110px',
        'sidebar-width': '220px',
      },
    },
  },
  plugins: [],
};
