# 🛒 Groceezy - Modern Grocery E-commerce Frontend

<p align="center">
  <img src="https://res.cloudinary.com/dp27ua535/image/upload/v1757216017/Screenshot_2025-09-07_091826_w6iplj.png" alt="Groceezy Logo" width="" />
  <br />
  <img alt="React" src="https://img.shields.io/badge/React-19.0.0-blue.svg">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-6.3.1-yellow.svg">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-4.1.4-blue.svg">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow.svg">
</p>  

**Groceezy** is a **modern, responsive frontend application** for grocery shopping. Built with **React and Vite**, it offers an **intuitive shopping experience** for customers and a **comprehensive seller dashboard** for managing products and orders.

---


## 📖 Overview

Groceezy provides a **full-featured e-commerce platform**:

* Browse products, search & filter by categories
* Manage cart, place orders, and track deliveries
* Seller dashboard with analytics, product & order management
* Mobile-first responsive design for seamless experience across devices

---

## 🌟 Features

### 👥 Customer Features

* 🏠 **Home Page** – Featured products & categories
* 🔍 **Search & Filtering** – Quick product discovery
* 🛍️ **Cart Management** – Add/remove/update items
* 👤 **User Authentication & Profile**
* 📍 **Address Management** for deliveries
* 📦 **Order History & Tracking**
* 📱 **Responsive Design** – Optimized for all devices

### 🏪 Seller Features

* 📊 **Seller Dashboard** – Analytics & performance metrics
* ➕ **Product Management** – Add, edit, delete products
* 📋 **Order Management** – Fulfillment & updates
* 📈 **Sales Analytics** – Track revenue and performance

### ⚙️ Technical Features

* ⚡ **Vite** – Lightning-fast development & build
* 🎨 **Tailwind CSS** – Modern utility-first styling
* 🔔 **Toast Notifications** – Feedback for users
* 📱 **Mobile-First Design** – Fully responsive
* 🎭 **Component-Based Architecture** – Scalable & maintainable

---

## 🚀 Tech Stack

**Frontend:**

* ⚛️ React 19.0.0
* ⚡ Vite 6.3.1
* 🎨 Tailwind CSS 4.1.4
* 🛤️ React Router DOM 7.5.1
* 🔗 Axios 1.9.0
* 🔔 React Hot Toast 2.5.2
* 🎨 React Icons 5.5.0
* 🧹 ESLint 9.22.0

---

## 📁 Project Structure

```
Frontend/
├── public/
│   ├── Groceezy.png         # Logo & favicon
│   └── Artist.png
├── src/
│   ├── assets/              # Images & icons
│   ├── Components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Login.jsx
│   │   ├── MainBanner.jsx
│   │   ├── Categories.jsx
│   │   ├── BestSeller.jsx
│   │   ├── ProductCart.jsx
│   │   ├── Testimonials.jsx
│   │   ├── NewsLetter.jsx
│   │   ├── ButtomBanner.jsx
│   │   └── Seller/          # Seller components
│   ├── Context/             # Global state management
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── AllProducts.jsx
│   │   ├── ProductCategory.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── AddAddress.jsx
│   │   ├── MyOrders.jsx
│   │   └── Seller/          # Seller dashboard pages
│   │       ├── SellerLayout.jsx
│   │       ├── AddProduct.jsx
│   │       ├── ProductList.jsx
│   │       └── Orders.jsx
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## 🏗️ Getting Started

### Prerequisites

* Node.js v18+
* npm or yarn
* Backend server running (see Backend folder)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd Groceezy-Frontend-v1.0/Frontend

# Install dependencies
npm install
```

Create a `.env` file in root:

```env
VITE_API_URL=http://localhost:5000/api
```

Start development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

* `npm run dev` – Start dev server with hot reload
* `npm run build` – Build app for production
* `npm run preview` – Preview production build locally
* `npm run lint` – Check code quality with ESLint

---

## 🔧 Configuration

* **Vite** – Configurable in `vite.config.js`
* **ESLint** – Rules in `eslint.config.js`
* **Tailwind CSS** – Utility-first styling with custom configurations

---

## 🔗 API Integration

Frontend communicates via **Axios**:

* 👤 **Authentication** – Login, Register, Profile
* 🛍️ **Products** – Browse, Categories, Search
* 🛒 **Cart** – Add/remove/update items
* 📦 **Orders** – Place orders & track history
* 🏪 **Seller Operations** – Product & order management

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch → `git checkout -b feature/amazing-feature`
3. Commit → `git commit -m "Add amazing feature"`
4. Push → `git push origin feature/amazing-feature`
5. Open a Pull Request 🎉

---

## 📝 Code Style

* Functional components with hooks
* Error handling & loading states
* Clean, readable, commented code
* Follow React best practices

---

## 🐛 Known Issues

* None currently reported 🚀

---

## 📄 License

MIT License – see LICENSE file.

---

## 👥 Authors

* **Groceezy Development Team**

---

## 🙏 Acknowledgments

* React ⚛️
* Vite ⚡
* Tailwind CSS 🎨
* All contributors & testers ❤️

---

