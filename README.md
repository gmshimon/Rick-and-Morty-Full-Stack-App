
# 🌀 Rick & Morty AI Character Explorer

A **full-stack AI-powered Rick and Morty character explorer** that integrates with the **Rick & Morty API**, supports **custom character creation**, and leverages **AI features** such as backstory generation, personality analysis, relationship predictions, and interactive character chatbots.

---

## 🚀 Features

### ✅ **Backend (Node.js + Express + MongoDB)**

* **API Integration:** Fetch and search characters by name/species from the Rick & Morty API.
* **Authentication:** JWT-based authentication with middleware to protect routes.
* **Custom Character Management:**

  * Create, update, delete, and list custom characters.
  * Fields: `name`, `species`, `status`, `gender`, `origin`, `image`, `backstory`.
* **AI Chatbot:**

  * Chat with custom or API-fetched characters.
  * AI responses mimic the **character’s personality and speech style** using **OpenAI GPT-4 streaming responses**.
  * Chat history stored for continuity.
* **Structured Logging:** Winston + Morgan logging.
* **Global Error Handling:** Centralized clean error responses.

### ✅ **AI Features Implemented**

* Character chatbot with backstory-based personality.
* Chat history persistence.

### ✅ **Frontend (Next.js 14 + Tailwind + shadcn/ui)**

* Modern UI setup with Tailwind CSS & shadcn/ui components.
* Planned pages:

  * **Character Search & Details Page**
  * **Custom Character CRUD UI**
  * **AI Chatbot Page**

---

## 🔑 Demo Login

To test the system, use this **demo account**:

```
📧 Email: simon.rosedale99@gmail.com  
🔑 Password: #Kola9696  
```

This account has basic access to:
✅ Login and get a JWT token
✅ Create & manage custom characters
✅ Chat with AI characters

*(If the user doesn’t exist, you can register it via `/api/user`)*

---

## 📚 Tech Stack

* **Backend:** Node.js, Express.js, MongoDB, JWT, Redis, Firebase
* **AI/ML:** OpenAI GPT-4 API
* **Frontend:** Next.js 14, Tailwind CSS, shadcn/ui (Radix components)
* **DevOps:** Winston + Morgan logging, dotenv config

---

