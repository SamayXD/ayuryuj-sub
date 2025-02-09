export const colors = {
  primary: '#1E97BF',    // Blue
  background: '#F1F5F4', // Light Gray
  surface: '#F5FBFB',    // Very Light Blue
  text: '#646971',       // Dark Gray
  accent: '#FF8769',     // Coral/Orange

  // Variations with opacity
  primaryAlpha: (opacity) => `rgba(30, 151, 191, ${opacity})`,
  accentAlpha: (opacity) => `rgba(255, 135, 105, ${opacity})`,

  // Utility functions
  getColorWithOpacity: (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
};

// export { colors };
export default colors;
