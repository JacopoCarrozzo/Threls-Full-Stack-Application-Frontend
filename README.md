# 🚀 Full-Stack Application -- Frontend (Next.js)

This repository contains the **Next.js** application, which serves as
the presentation layer (frontend) for the ** Headless CMS**,
powered by **Laravel + Filament**.

The frontend retrieves all dynamic content, menus, and media (images)
via API endpoints exposed by the **Laravel Backend Repository**.

------------------------------------------------------------------------

## 🛠️ Prerequisites

To run this application locally, you must have the following running and
correctly configured:

1.  **Node.js** (version 18 or higher recommended)\
2.  **npm** or **Yarn**\
3.  The **Laravel Backend** running locally and reachable via a local
    development domain
    -   **Example domain:** `http://full-stack-application.test`

------------------------------------------------------------------------

## ⚙️ Installation and Setup

### 1. Clone the Repository

``` bash
git clone https://github.com/JacopoCarrozzo/https://github.com/JacopoCarrozzo/Full-Stack-Application-Front-End
cd Full-Stack-Application-Front-End
```

### 2. Install Dependencies

``` bash
npm install
# or
yarn install
```

### 3. Configure the Environment Variables

Create a `.env.local` file in the project root:

    # .env.local
    NEXT_PUBLIC_API_BASE_URL="http://your-laravel-domain.test"

------------------------------------------------------------------------

### 4. Configure Image Domains (`next.config.js`)

The Next.js `<Image />` component requires explicit permission for
external domains.

⚠️ **IMPORTANT:**\
The hostname MUST match exactly your Laravel local domain.\
If it differs, update it accordingly.

``` ts
// Excerpt from next.config.ts
images: {
    remotePatterns: [
        {
            protocol: "http",
            hostname: "http://your-laravel-domain.test",
            pathname: "/storage/**",
        },
        {
            protocol: "http",
            hostname: "http://your-laravel-domain.test",
            pathname: "/page-images/**",
        },
    ],
    // Allows local IPs and localhost setups to work with external images
    dangerouslyAllowLocalIP: true,
},

// (Optional, if using Next.js proxy/middleware)
allowedDevOrigins: [
    "http://your-laravel-domain.test",
    "http://localhost:8000",
],
```

------------------------------------------------------------------------

## ▶️ Launching the Application

Start the development server:

``` bash
npm run dev
# or
yarn dev
```

The application will be available at:

    http://localhost:3000

------------------------------------------------------------------------
