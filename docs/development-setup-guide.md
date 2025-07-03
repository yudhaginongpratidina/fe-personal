# Development Setup Guide

A comprehensive guide to set up the development environment for the personal website project.

## Prerequisites

Before you begin, ensure you have the following tools installed on your system:

- **Node.js** (version 18.0 or higher recommended)
- **PNPM** (Package manager - faster alternative to npm)

### Installing Prerequisites

If you don't have these tools installed:

1. **Node.js**: Download and install from [nodejs.org](https://nodejs.org/)
2. **PNPM**: Install globally using npm:
   ```bash
   npm install -g pnpm
   ```

## Installation

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/yudhaginongpratidina/personal-website.git
cd personal-website
```

### 2. Install Dependencies

Install all required project dependencies using PNPM:

```bash
pnpm install
```

This command will read the `package.json` file and install all necessary packages in the `node_modules` directory.

### 3. Environment Configuration

Set up the environment variables required for the application:

```bash
cp .env.example .env
```

Open the newly created `.env` file and configure the following variables:

```env
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_BACKEND=http://{YOUR_IP}:{YOUR_PORT}/{YOUR_ENDPOINT}
```

#### Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_ENVIRONMENT` | Specifies the current environment mode | `development` or `production` |
| `NEXT_PUBLIC_BACKEND` | Backend API endpoint URL | `http://localhost:3001/api` |

**Note**: Replace `{YOUR_IP}`, `{YOUR_PORT}`, and `{YOUR_ENDPOINT}` with your actual backend server configuration.

## Running the Development Server

Start the development server with hot-reload enabled:

```bash
pnpm run dev
```

## Available Scripts

Here are the commonly used development scripts:

```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm run start

# Run linting
pnpm run lint

# Run tests (if available)
pnpm run test
```

## Troubleshooting

### Common Issues

1. **Module not found errors**: Ensure all dependencies are installed by running `pnpm install` again.

2. **Environment variables not loading**: Verify that your `.env` file is in the project root directory and contains the correct variable names.