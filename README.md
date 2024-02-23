# Chat App

Public real-time chat application

- Client: <https://chat-mi6cifgfq-hasferrrs-projects.vercel.app>
- Server: <https://chat-app-gg5e.onrender.com>

## Installation

Both client and server requires a `.env` file in the root directory, install the dependencies, and run the application.

### Client

#### Environment variable

```.env
VITE_SOCKET_SERVER_URL=
```

#### Dependencies and Run the Application

```bash
cd client
npm install
npm run dev
```

### Server

#### Environment variable

Get the MongoDB URI: <https://www.mongodb.com/basics/mongodb-connection-string>

```.env
MONGODB_URI=
PORT=
SECRET=
```

#### Dependencies and Run the Application

```bash
cd server
npm install
npm run dev
```
