# Banking App

A modern, professional banking application built with React, TypeScript, and Vite. This application provides a clean interface for viewing account information and transaction history, with real-time data from the Treasury Prime API.

## 🚀 Features

- **Modern UI/UX**: Professional banking interface with smooth animations
- **Real-time Data**: Live account and transaction data from Treasury Prime API
- **Expandable Transactions**: Click to view detailed transaction information
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Support**: Automatic theme switching based on user preference
- **Type Safety**: Full TypeScript implementation for better development experience
- **Styled Components**: Modern CSS-in-JS styling with dynamic theming

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Styled Components
- **State Management**: React Context API
- **API**: Treasury Prime Banking API
- **Environment**: Node.js

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Treasury Prime API credentials** (sandbox or production)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd banking-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
# For Vite (development)
VITE_TREASURY_PRIME_USERNAME=your_api_key_id
VITE_TREASURY_PRIME_PASSWORD=your_api_key_value

# For production backend (if using Express server)
TREASURY_PRIME_USERNAME=your_api_key_id
TREASURY_PRIME_PASSWORD=your_api_key_value
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Development

### Project Structure

```
src/
├── components/
│   ├── TransactionList/
│   │   └── TransactionList.tsx
│   ├── TransactionItem/
│   │   └── TransactionItem.tsx
│   ├── LoadingSpinner/
│   │   ├── LoadingSpinner.tsx
│   │   └── LoadingSpinner.css
│   └── ErrorMessage/
│       ├── ErrorMessage.tsx
│       └── ErrorMessage.css
├── contexts/
│   └── BankAccountContext/
│       ├── BankAccountContext.ts
│       ├── BankAccountProvider.tsx
│       └── useBankAccount.ts
├── types.ts
└── index.css
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### API Configuration

The application uses a Vite proxy configuration to handle CORS issues during development. The proxy automatically adds authentication headers to API requests.

**Production Note**: For production deployment, you should use the included Express server (`server.js`) to handle API calls and avoid CORS issues.

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Build the application**:

   ```bash
   npm run build
   ```

3. **Deploy**:

   ```bash
   vercel
   ```

4. **Set Environment Variables** in Vercel dashboard:
   - `VITE_TREASURY_PRIME_USERNAME`
   - `VITE_TREASURY_PRIME_PASSWORD`

### Option 2: Netlify

1. **Build the application**:

   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:

   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository

3. **Set Environment Variables** in Netlify dashboard

### Option 3: Express Server (Production)

For production environments where you need to handle CORS properly:

1. **Install server dependencies**:

   ```bash
   npm install express cors node-fetch
   ```

2. **Set up environment variables**:

   ```bash
   TREASURY_PRIME_USERNAME=your_api_key_id
   TREASURY_PRIME_PASSWORD=your_api_key_value
   ```

3. **Start the server**:

   ```bash
   node server.js
   ```

4. **Build and serve the frontend**:
   ```bash
   npm run build
   # Serve the dist folder with your preferred static file server
   ```

### Option 4: Docker

1. **Create a Dockerfile**:

   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm ci --only=production

   COPY . .
   RUN npm run build

   EXPOSE 3000

   CMD ["node", "server.js"]
   ```

2. **Build and run**:
   ```bash
   docker build -t banking-app .
   docker run -p 3000:3000 -e TREASURY_PRIME_USERNAME=your_key -e TREASURY_PRIME_PASSWORD=your_secret banking-app
   ```

## 🔒 Security Considerations

- **Environment Variables**: Never commit API credentials to version control
- **CORS**: Use the Express server in production to handle API calls securely
- **HTTPS**: Always use HTTPS in production
- **API Keys**: Rotate API keys regularly and use least-privilege access

## 🧪 Testing

### Manual Testing Checklist

- [ ] Account information displays correctly
- [ ] Transactions load and display properly
- [ ] Transaction expansion/collapse works
- [ ] Responsive design works on mobile
- [ ] Dark mode switches correctly
- [ ] Error states display appropriately
- [ ] Loading states show during API calls

### Automated Testing (Future Enhancement)

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm test
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure you're using the Vite proxy in development or Express server in production
2. **API Authentication**: Verify your Treasury Prime credentials are correct
3. **Build Errors**: Check that all dependencies are installed
4. **Environment Variables**: Ensure `.env` file is in the root directory

### Debug Mode

Enable debug logging by adding to your `.env`:

```bash
DEBUG=true
```

## 📝 API Documentation

This application integrates with the Treasury Prime API. For detailed API documentation, visit:

- [Treasury Prime API Docs](https://docs.treasuryprime.com/)

### Key Endpoints Used

- `GET /account/{account_id}` - Fetch account information
- `GET /account/{account_id}/transaction` - Fetch transaction history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- **Issues**: Create an issue in the GitHub repository
- **Documentation**: Check the Treasury Prime API documentation
- **Community**: Join our community discussions

## 🔄 Changelog

### v1.0.0

- Initial release
- Account information display
- Transaction list with expandable details
- Responsive design
- Dark mode support
- Professional banking UI

---

**Note**: This application is for demonstration purposes. For production use, ensure proper security measures, error handling, and compliance with financial regulations.
