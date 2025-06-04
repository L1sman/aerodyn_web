# Aerodyn Web Dashboard

A modern web dashboard for managing and monitoring deliveries, built with React, TypeScript, and Vite.

## Features

- 📊 Real-time delivery tracking and monitoring
- 🔍 Advanced filtering system for deliveries
- 📈 Interactive charts and data visualization
- 📱 Responsive design for all devices
- 🌙 Dark mode support
- 🔐 Secure authentication system

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** MobX
- **UI Components:** Mantine
- **Styling:** SCSS Modules
- **Charts:** Recharts
- **HTTP Client:** Axios
- **Router:** React Router v6

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm 7.0 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/aerodyn_web.git
cd aerodyn_web
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_API_URL=your_api_url_here
```

### Development

Start the development server:
```bash
npm run dev
```

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── app/              # Application entry point and global providers
├── entities/         # Business entities
├── features/         # Feature modules
├── pages/           # Application pages
├── shared/          # Shared utilities, types, and components
└── styles/          # Global styles and variables
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
