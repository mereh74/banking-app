# Banking App

A simple prototype of a banking application built with React, TypeScript, and Vite. This application provides a clean interface for viewing account information and transaction history, with real-time data from the Treasury Prime API.

## 🛠️ Tech Stack and justification for use

- **Frontend**: React 18 with TypeScript
  - TypeScript provides the ability to strongly type values, making it possible to catch type-related errors at compile time rather than run time. It also enables autocomplete and inline documentation within the IDE, making the lives of developers much easier.
- **Build Tool**: Vite
- **Styling**: Styled Components
  - Styled Components provides clean css-in-TypeScript capabilities, avoiding the need for separate css files. These components are easy to reason about and live side-by-side with the elements they are used for.
- **State Management**: React Context API
  - The choice to use React's Context API was made for two main reasons. One, we can encapsulate the account and transaction state (and the details of populating it) in one area - the `BankAccountContext`. Two, the current application is simple enough that it doesn't require anything more complex for state management (such as Redux).
- **API**: Treasury Prime Banking API
- **Environment**: Node.js

## 🔮 Future considerations

- **Application State Management**
  - As more features are added to this application, the complexity of managing its state will grow. The React Context API provides good support for state management for simple use cases and can continue to be used in parallel with other solutions. However, it will be prudent to investigate the use of libraries such as [React Redux](https://react-redux.js.org/) for managing more complex application state.
- **Routing**
  - As the current application only contains one view - `TransactionList.tsx` - routing was not a consideration at this time. In the future, as we add other views and navigation, we will need a solution for routing such as [React Router](https://reactrouter.com/).
- **Remote State Management**
  - The application is currently managing its remote state within the `BankAccountProvider` using the `useEffect` and `useState` hooks provided by React. This is sufficient for now, as the application only requires fetching the data once at application load time. As we add more features, it will become necessary to consider things like caching and keeping the UI in sync with remote state from the Treasury Prime API. For this, we can investigate the use of solutions such as [Tanstack Query](https://tanstack.com/query/latest).
- **Automated Testing**
  - As this is a simple prototype, no automated testing has been added. If this application were ever to be deployed to production, a prerequisite should be the addition of:
    - Unit tests
      - between 90% and 100% test coverage
      - recommended use of [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - End-to-end behavioral tests
    - these should cover - at minimum - the happy-path scenarios of the application
    - they should be run as part of the integration and deployment pipelines
    - recommended use of [Cypress](https://www.cypress.io/) or [Playwright](https://playwright.dev/) for testing frameworks.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Treasury Prime API credentials** (sandbox)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone git@github.com:mereh74/banking-app.git
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

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure you're using the Vite proxy in development
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

## 🔄 Changelog

### v1.0.0

- Initial release
- Account information display
- Transaction list with expandable details
- Responsive design
- Dark mode support
- Professional banking UI

---
