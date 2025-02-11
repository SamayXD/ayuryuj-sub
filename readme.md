# AyurYuj Mobile App

A React Native healthcare application built with Expo.



## Screenshots

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/a4a5ab14-76b5-4f90-8ebd-54467a283f98" alt="Simulator Screenshot - iPhone 16 Pro - 2025-02-11 at 22 00 26" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/c93f4aaf-0eac-4d5b-87f7-dd97d6407b46" alt="Simulator Screenshot - iPhone 16 Pro - 2025-02-11 at 22 01 40" width="300"/></td>
          <td><img src="https://github.com/user-attachments/assets/bf0327bd-5abc-4a31-b281-9740a2e9d8e4" alt="Simulator Screenshot - iPhone 16 Pro - 2025-02-11 at 22 01 50" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/654dfa41-958b-4c16-9054-872c0deb0a79" alt="Simulator Screenshot - iPhone 16 Pro - 2025-02-11 at 22 01 46" width="300"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/3f1331ab-3c6d-4cd1-a71f-97f8cdb44344" alt="Simulator Screenshot - iPhone 16 Pro - 2025-02-11 at 22 01 54" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/f6b43ff9-9329-4064-90c0-85aac811759d" alt="Simulator Screenshot - iPhone 16 Pro - 2025-02-11 at 22 01 58" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/2315357d-2e94-4d2a-b535-7883c70d9bad" alt="Simulator Screenshot - iPhone 16 Pro - 2025-02-11 at 22 02 02" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/42d35534-721a-4433-bfb4-f7e9c3fdc141" alt="Simulator Screenshot - iPhone 16 Pro - 2025-02-11 at 22 02 04" width="300"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/5e157413-4319-4ed5-a765-b81134450798" alt="Simulator Screenshot - iPhone 16 Pro - 2025-02-11 at 22 02 06" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/f7e5952a-1e02-4872-9a2f-e75c52d706de" alt="Simulator Screenshot - iPhone 16 Pro - 2025-02-11 at 22 02 10" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/9b9e27f1-b38d-4a13-b901-ab20c62f5c0e" alt="Simulator Screenshot - iPhone 16 Pro - 2025-02-11 at 22 02 13" width="300"/></td>
  </tr>
</table>


## Demo Video


https://github.com/user-attachments/assets/a987cacc-e696-4549-a908-2f1a3209bc1b


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

---
