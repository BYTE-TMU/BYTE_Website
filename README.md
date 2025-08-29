# BYTE Website - Internal Development

Private repository for BYTE website development. This contains the complete codebase for the official BYTE website including frontend interface and planned backend infrastructure.

## Technology Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation

### Backend
- To be implemented (Flask/FastAPI)

## Project Structure

```
BYTE_Website/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   └── assets/
│   ├── public/
│   └── package.json
├── Backend/ (planned)
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository (ensure you have access to this private repo)
```bash
git clone [REPO_URL]
cd BYTE_Website
```

2. Install frontend dependencies
```bash
cd Frontend
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Task List

### Current Sprint

- [ ] Implement consistent background styling across all pages

### Upcoming Development

- [ ] Implement Flask/FastAPI backend infrastructure
- [ ] Build admin panel frontend interface
- [ ] Establish backend-frontend integration
- [ ] Optimize responsive design for mobile devices of all sizes

### Completed

- [x] Implement new color scheme rebrand
- [x] Change footer colors to match new color scheme
- [x] Develop Contact component for Support page
- [x] Create "Meet the Team" component for About page
- [x] Create "Project Contributors" component for About page
- [x] Refine Hero section to match Figma design specifications
- [x] Update Team section component to display small teams better, and add whole team tab

## Design System

The website follows a cyberpunk-inspired design system with the following color palette:

- Primary Cyan: #48F5FE
- Primary Blue: #4C5EF6
- Dark Blue: #2C3790  
- Teal Accent: #2B9398
- Border Green: #CEFE00
- Background: ??????

## Development Workflow

1. Create a feature branch from main using descriptive naming: `feature/component-name` or `fix/issue-description`
2. Follow existing code patterns and component structure
3. Test changes across desktop and mobile viewports
4. Update task list in README when completing items

## Internal Notes

- All design assets and Figma files are available to team members
- Color scheme was recently updated
- Backend implementation pending

