# React Todo App

## Overview
The React Todo App is a simple, feature-rich application for managing tasks. It provides functionality for user authentication, task pagination, and intuitive navigation, making it a great starting point for exploring React development with modern tools and techniques.

---

## Features
- **User Authentication**: Login functionality with token-based authentication.
- **Task Management**: Display a paginated list of todos fetched from a mock API.
- **Pagination**: Navigate seamlessly between pages of todos.
- **Responsive Design**: A clean, user-friendly interface styled with CSS.

---

## Tech Stack
- **Frontend**: React.js
- **State Management**: React Hooks (`useState`, `useEffect`)
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **API**: [DummyJSON API](https://dummyjson.com/)
- **Styling**: Custom CSS
- **Testing**: Jest and React Testing Library

---

## Project Structure
```
react-todo-app
├── public
├── src
│   ├── api
│   │   ├── apiClient.js
│   │   ├── auth.js
│   │   └── todos.js
│   ├── components
│   │   ├── LoginForm.js
|   |   |── Header.js
│   │   ├── Pagination.js
│   │   ├── TodoItem.js
│   │   └── TodoList.js
│   ├── pages
│   │   ├── LoginPage.js
│   │   └── TodosPage.js
│   ├── styles
│   │   ├── LoginPage.css
│   │   ├── TodoItem.css
│   │   ├── TodoList.css
│   │   └── TodosPage.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

---

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 14.x)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-todo-app.git
   cd react-todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the app in your browser at:
   ```
   http://localhost:3000
   ```

---

## Usage
### Login
1. Use the credentials from the DummyJSON API:
   - **Username**: `emilys`
   - **Password**: `emilyspass`

### Todos Page
- View a paginated list of tasks.
- Navigate using the `Previous` and `Next` buttons.

---

## Testing
Run tests with:
```bash
npm test
```
- Test coverage includes components and API calls.

---

## API Endpoints
- **Login**: `POST /auth/login`
- **Fetch Todos**: `GET /todos`

---

## Screenshots
### Login Page
![Login Page Screenshot](./screenshots/login.png)

### Todos Page
![Todos Page Screenshot](./screenshots/todos.png)

---

## Future Enhancements
- Add functionality to create, edit, and delete todos.
- Integrate a backend for storing and managing tasks.
- Improve styling for better UX.

---

## License
This project is licensed under the MIT License.

---





