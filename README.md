# 🚀 Production-Grade Node.js/Express Backend Template

A **clean, modular, and production-ready** backend structure for Node.js/Express APIs.  
Perfect for **learning, teams, college projects, and quick REST API boilerplates**.

---

## 📁 Project Structure
```
src/
├── config/ # App, DB, and environment configurations
├── controllers/ # Route handlers (MVC controllers)
├── middlewares/ # Custom middleware (auth, validation, error handling)
├── models/ # Database models/schemas (Mongoose, etc.)
├── routes/ # API endpoint definitions
├── services/ # Business logic and reusable services
├── utils/ # Utility functions (validators, logger, etc.)
├── app.js # Express app initialization (middleware, routes)
└── server.js # Server entry point
tests/ # Unit and integration tests
public/ # Static files (if needed)
docs/ # API documentation (Swagger/OpenAPI)
Dockerfile # Containerization support
docker-compose.yml # Local development with DB
.env # Environment variables (local secrets, DO NOT COMMIT)
.env.example # Environment variable template
CONTRIBUTING.md # Contribution guidelines
package.json
README.md
```

---

## ✨ Features

- **Clean MVC Architecture**: Separation of concerns for maintainability.
- **Modular & Scalable**: Easy to extend for new features, databases, or microservices.
- **Centralized Config**: Environment variables, app settings, and DB config in one place.
- **JWT Authentication**: Ready-to-integrate using jsonwebtoken.
- **Cloudinary Support**: For media uploads (avatars, covers, etc.).
- **Swagger/OpenAPI**: Auto-generated API docs.
- **Docker Support**: Containerized development and production.
- **Centralized Error Handling**: Clean, uniform error responses.
- **Logging**: Winston/Morgan integration (optional).
- **Testing**: Jest/Mocha setup (optional).
- **CI/CD Ready**: Pre-configured for GitHub Actions (optional).

---

## 🛠️ Getting Started

### 1. Clone the Repository

git clone https://github.com/stylemecck/toutoria-backend.git
cd toutoria-backend


### 2. Install Dependencies
```
npm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env` and fill in your secrets. **Never commit `.env` to version control!**

#### Example `.env` file
```
PORT=8000
CORS_ORIGIN=*
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.<host>.mongodb.net/<db>?retryWrites=true&w=majority

JWT Secrets (generate securely, never share!)
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=2h
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

Cloudinary (for media uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Optional
NODE_ENV=development


**How to generate secure JWT secrets:**  
Open your terminal and run:  

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Start the Server
```
npm run start
```

### 5. Access in Development

- **API**: `http://localhost:8000`
- **Swagger Docs**: `http://localhost:8000/docs` (if set up)
- **Health Check**: `http://localhost:8000/health`

---

## 🧪 Testing
```
npm test
```

---

## 🐳 Docker Support

**Build and run with Docker:**
```
docker-compose up --build
```

Your app will be available at `http://localhost:8000`.  
DB, app, and other services are managed via `docker-compose.yml`.

---

## 📚 API Documentation (Swagger)

Auto-generated OpenAPI specs are available at `/docs`.  
See [src/docs](src/docs) for setup instructions.

---

## 💡 Additional Features

- **Centralized Error Handling**: Unhandled errors return consistent JSON responses.
- **Request Validation**: Uses `express-validator` in `utils/`.
- **Logging**: Winston and Morgan can be integrated in `utils/logger.js`.
- **Logs Directory**: Set up `logs/` if you log to files.
- **Sample Controllers, Services, Models**: Ready-to-copy templates in their folders.
- **Docker Production**: Ready for container orchestration.
- **Contributing Guidelines**: See [CONTRIBUTING.md](CONTRIBUTING.md) for pull requests, code reviews, and style.

---

## 🚧 Future Roadmap

- [ ] Swagger/OpenAPI integration
- [ ] Dockerfile for production
- [ ] Pre-configured CI/CD (GitHub Actions)
- [ ] Advanced role-based access control
- [ ] Rate limiting and API security headers
- [ ] Social login (Google, GitHub, etc.)
- [ ] GraphQL support

---

## 👨‍💻 Author

**Satyam Kumar (StyleMecck)**  
If you find this useful, consider ⭐ starring the repo!  
Feedback, issues, and pull requests are welcome.

---

## 📜 License

MIT

---

> **Enjoy building your backend!**
