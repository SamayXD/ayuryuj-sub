# AyurYuj Mobile App

A React Native healthcare application built with Expo.

## Demo Video
[Watch Demo Video](https://youtu.be/your-video-id) - Coming Soon

## Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <img src="./screenshots/login.png" width="200" alt="Login Screen"/>
    <img src="./screenshots/home.png" width="200" alt="Home Screen"/>
    <img src="./screenshots/doctors.png" width="200" alt="Doctors List"/>
    <img src="./screenshots/profile.png" width="200" alt="Profile Screen"/>
</div>

## Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo Go app on your mobile device ([iOS](https://apps.apple.com/app/apple-store/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd ayuryuj-sub
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

## Running on Your Device

1. Install Expo Go on your mobile device
2. Make sure your phone and computer are on the same Wi-Fi network
3. Start the development server using the command above
4. Scan the QR code with:
   - iOS: Use the Camera app
   - Android: Use the Expo Go app

## Development Commands

```bash
# Start the development server
npm start

# Start with clear cache
npx expo start --clear

# Start on a specific port
npx expo start --port 19001
```

## Project Structure

```
ayuryuj-sub/
├── app/
│   ├── screens/          # Screen components
│   ├── components/       # Reusable components
│   ├── utils/           # Utility functions
│   └── index.js         # Entry point
├── assets/              # Images, fonts, etc.
└── screenshots/         # App screenshots
```

## Troubleshooting

1. Metro bundler issues:
```bash
npx expo start --clear
```

2. Dependency issues:
```bash
rm -rf node_modules
npm install
```

3. Network issues:
   - Ensure your phone and computer are on the same Wi-Fi network
   - Try using a tunnel connection: `npx expo start --tunnel`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is private and proprietary.