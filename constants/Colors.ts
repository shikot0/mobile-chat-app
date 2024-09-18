const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    secondaryText: '#111',
    background: '#fff',
    elevated: '#111',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    borderColor: 'grey',
    primary: 'lightgreen',
    danger: 'rgb(255, 0, 0)',
    primaryButtonText: 'rgba(0, 0, 0, .75)',
    tabIconSelected: tintColorLight,
  },
  dark: {
    // text: '#fff',
    text: '#rgba(255, 255, 255, .85)',
    secondaryText: '#ddd',
    background: '#121212',
    elevated: '#222',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    borderColor: 'rgba(255, 255, 255, .25)',
    primary: 'lightgreen',
    danger: 'rgb(255, 0, 0)',
    primaryButtonText: 'rgb(50, 50, 50)',
    tabIconSelected: tintColorDark,
  },
};
