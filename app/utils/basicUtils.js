import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions that you're designing for
const baseWidth = 375;
const baseHeight = 812;

// Scales
const widthScale = SCREEN_WIDTH / baseWidth;
const heightScale = SCREEN_HEIGHT / baseHeight;

export const responsive = {
  window: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  
  // Existing functions
  width: (size) => {
    const newSize = size * widthScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  },
  
  height: (size) => {
    const newSize = size * heightScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  },
  
  font: (size) => {
    const scale = Math.min(widthScale, heightScale);
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  },
  
  m: (size) => {
    const scale = Math.min(widthScale, heightScale);
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  },

  // New percentage-based functions
  wp: (percentage) => {
    return (SCREEN_WIDTH * percentage) / 100;
  },

  hp: (percentage) => {
    return (SCREEN_HEIGHT * percentage) / 100;
  },

  // Function to calculate both width and height percentages
  size: (width, height) => {
    return {
      width: (SCREEN_WIDTH * width) / 100,
      height: (SCREEN_HEIGHT * height) / 100,
    };
  },

  // Function for flexible dimensions based on screen ratio
  ratio: (dimension, ratio) => {
    return dimension * ratio;
  }
};

export default {
  responsive
};