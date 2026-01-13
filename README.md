# AI Assistant

https://ai-assistant-fe.onrender.com/

A full-stack AI assistant application with React frontend and Node.js backend.

## Features

- User authentication
- AI-powered assistant
- Responsive design
- Cloudinary integration for media handling

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Database**: (Add your database here, e.g., MongoDB)
- **Authentication**: (e.g., JWT)
- **Cloud Storage**: Cloudinary

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- (Add any other prerequisites)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/ai-assistant.git
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables
   - Create `.env` files in both frontend and backend directories
   - Add required environment variables (refer to `.env.example` if available)

4. Start the development servers
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # In a new terminal, start frontend
   cd frontend
   npm start
   ```

## Available Scripts

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

## Environment Variables

### Frontend
```
REACT_APP_API_URL=http://localhost:5000
# Add other frontend environment variables here
```

### Backend
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
# Add other backend environment variables here
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
