<div align="center">

 
  # Rwanda Location Selector

  <p align="center">
    <strong>A modern, accessible, and user-friendly React component for selecting locations in Rwanda</strong>
  </p>
  
  <p align="center">
    <a href="https://github.com/hbapte/rwanda-location/stargazers">
      <img src="https://img.shields.io/github/stars/hbapte/rwanda-location?style=for-the-badge&color=yellow" alt="Stars" />
    </a>
    <a href="https://github.com/hbapte/rwanda-location/network/members">
      <img src="https://img.shields.io/github/forks/hbapte/rwanda-location?style=for-the-badge&color=orange" alt="Forks" />
    </a>
    <a href="https://github.com/hbapte/rwanda-location/issues">
      <img src="https://img.shields.io/github/issues/hbapte/rwanda-location?style=for-the-badge&color=red" alt="Issues" />
    </a>
    <a href="https://github.com/hbapte/rwanda-location/blob/master/LICENCE">
      <img src="https://img.shields.io/github/license/hbapte/rwanda-location?style=for-the-badge&color=blue" alt="License" />
    </a>
  </p>

  <p align="center">
    <a href="https://nextjs.org/">
      <img src="https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    </a>
    <a href="https://react.dev/">
      <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react" alt="React" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
    </a>
    <a href="https://tailwindcss.com/">
      <img src="https://img.shields.io/badge/Tailwind-4.0.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
    </a>
  </p>

  <br />

  <p align="center">
    <a href="#-demo">View Demo</a>
    ·
    <a href="#-installation">Installation</a>
    ·
    <a href="#-usage">Usage</a>
    ·
    <a href="https://github.com/hbapte/rwanda-location/issues">Report Bug</a>
    ·
    <a href="https://github.com/hbapte/rwanda-location/issues">Request Feature</a>
  </p>
</div>

<div align="center">
  <img src="https://rwanda-location.vercel.app/screenshot.jpg" alt="Rwanda Location Selector Demo" width="800" />
</div>

## 📋 Table of Contents

- [Rwanda Location Selector](#rwanda-location-selector)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🌍 Rwanda's Administrative Structure](#-rwandas-administrative-structure)
  - [🚀 Demo](#-demo)
  - [⚙️ Installation](#️-installation)
    - [Prerequisites](#prerequisites)
    - [Option 1: Clone the Repository](#option-1-clone-the-repository)
- [Clone the repository](#clone-the-repository)
- [Navigate to the project directory](#navigate-to-the-project-directory)
- [Install dependencies](#install-dependencies)
- [or](#or)
- [or](#or-1)
- [or](#or-2)
- [Start the development server](#start-the-development-server)

## ✨ Features

- 🌐 **Hierarchical Selection**: Navigate through Rwanda's administrative divisions (Provinces → Districts → Sectors → Cells → Villages)
- 🔄 **Cascading Updates**: Each selection level automatically updates dependent fields
- 🎭 **Smooth Animations**: Beautiful transitions powered by Framer Motion
- 📱 **Fully Responsive**: Works perfectly on all device sizes
- 🧩 **Form Integration**: Built with React Hook Form and Zod validation
- 🔍 **Loading States**: Clear visual feedback during data loading
- 🎨 **Modern UI**: Clean design with shadcn/ui components
- 🚀 **Type-Safe**: Full TypeScript support
- 🌙 **Accessibility**: ARIA-compliant and keyboard navigable
- 🔒 **Validation**: Built-in form validation with helpful error messages
- 🎯 **Zero Dependencies**: No external API calls required, uses local data

## 🌍 Rwanda's Administrative Structure

Rwanda is organized into a hierarchical administrative structure:

<div align="center">
  <table>
    <tr>
      <th>Level</th>
      <th>Count</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>Provinces</td>
      <td>5</td>
      <td>The highest administrative division</td>
    </tr>
    <tr>
      <td>Districts</td>
      <td>30</td>
      <td>Subdivisions of provinces</td>
    </tr>
    <tr>
      <td>Sectors</td>
      <td>416</td>
      <td>Subdivisions of districts</td>
    </tr>
    <tr>
      <td>Cells</td>
      <td>2,148</td>
      <td>Subdivisions of sectors</td>
    </tr>
    <tr>
      <td>Villages</td>
      <td>14,837</td>
      <td>The smallest administrative units</td>
    </tr>
  </table>
</div>

This component makes it easy to navigate this complex structure with a user-friendly interface.

## 🚀 Demo

Check out the live demo of the Rwanda Location Selector:

🔗 [Live Demo](https://rwanda-location.vercel.app)

## ⚙️ Installation

### Prerequisites

- Node.js 18.0.0 or later
- npm, yarn, pnpm, or bun

### Option 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/hbapte/rwanda-location.git

# Navigate to the project directory
cd rwanda-location

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install

# Start the development server
npm run dev