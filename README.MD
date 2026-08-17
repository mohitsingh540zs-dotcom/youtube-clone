# YouTube Clone - MERN Stack

A full-stack YouTube-inspired video-sharing platform built with the **MERN (MongoDB, Express.js, React, Node.js) stack**.

Users can create channels, upload videos, interact through comments, like videos, subscribe to channels, and search for content through a responsive and modern user interface.

---

## Features

### Authentication

- User registration
- User login
- Cookie-based authentication
- JWT authentication
- Protected routes
- Logout functionality

---

### Channel Management

- Create a channel
- View channel details
- Edit channel information
- Upload a channel banner
- View all videos uploaded by a channel
- Subscribe to channels
- Unsubscribe from channels

---

### Video Management

- Upload videos
- Watch videos
- Edit videos
- Delete videos
- Video categories
- Related videos
- Video statistics (views and likes)

---

### Comment System

- Add comments
- Edit comments
- Delete comments

---

### Like System

- Like videos
- Unlike videos
- Retrieve like status

---

### Search and Filtering

- Search videos by title
- Search channels
- Filter videos by category

---

### User Interface

- Responsive design
- Sidebar navigation
- Skeleton loaders
- Route-based lazy loading
- Empty-state messages
- Custom loaders

---

## Tech Stack

### Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Cloudinary

---

## Project Structure

youtube-clone
│
├── youtube_frontend
│ ├── src
│ │ ├── api
│ │ ├── assets
│ │ ├── components
│ │ ├── context
│ │ ├── hooks
│ │ ├── layouts
│ │ ├── pages
│ │ ├── routes
│ │ ├── utils
│ │ ├── App.jsx
│ │ └── main.jsx
│
└── youtube_backend
├── config
├── controllers
├── middlewares
├── models
├── routes
├── utils
├── app.js
└── server.js

````

---

## Installation

### Clone the repository

```bash
git clone https://github.com/mohitsingh540zs-dotcom/youtube-clone
````

### Install frontend dependencies

```bash
cd client
npm install
```

### Install backend dependencies

```bash
cd server
npm install
```

---

## Environment Variables

### Backend (.env)

PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET_KEY=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173

---

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

---

## Running the Application

### Start the backend server

```bash
cd server
npm run dev
```

### Start the frontend server

```bash
cd client
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |

| POST | `/auth/register` | Register a user |
| POST | `/auth/login` | Login |
| POST | `/auth/logout` | Logout |
| GET | `/auth/me` | Get authenticated user |

---

### Channels

| Method | Endpoint | Description |

| POST | `/channel/create` | Create a channel |
| GET | `/channel/me` | Get the current user's channel |
| PUT | `/channel/update` | Update channel |
| GET | `/channel/:id` | Get channel details |

---

### Videos

| Method | Endpoint | Description |

| POST | `/videos/upload` | Upload a video |
| GET | `/videos` | Get all videos |
| GET | `/videos/:id` | Get a single video |
| PUT | `/videos/:id` | Edit a video |
| DELETE | `/videos/:id` | Delete a video |
| GET | `/videos/search` | Search videos |
| GET | `/videos/category/:category` | Filter videos by category |

---

### Comments

| Method | Endpoint | Description |

| POST | `/comments/:videoId` | Add a comment |
| PUT | `/comments/:commentId` | Edit a comment |
| DELETE | `/comments/:commentId` | Delete a comment |

---

### Likes

| Method | Endpoint | Description |

| POST | `/likes/:videoId` | Like a video |
| DELETE | `/likes/:videoId` | Unlike a video |
| GET | `/likes/:videoId` | Get like status |

---

### Subscriptions

| Method | Endpoint | Description |

| POST | `/subscription/subscribe/:channelId` | Subscribe |
| DELETE | `/subscription/unsubscribe/:channelId` | Unsubscribe |
| GET | `/subscription/status/:channelId` | Get subscription status |

---

## Future Improvements

- Playlists
- Notifications
- Watch history
- Watch later
- Video recommendations

---

## Author

**Mohit Singh Bisht**

- React.js
- Node.js
- Express.js
- MongoDB

---

## License

This project was developed for educational purposes.
