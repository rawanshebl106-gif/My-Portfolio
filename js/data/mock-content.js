/**
 * Static portfolio content used by the public GitHub showcase.
 * This module intentionally has no database, API, auth, network, or storage integration.
 * Replace example content and generic social URLs with verified public information before publishing.
 */
import { validateField } from '../core/sanitize.js';

export const MOCK_PORTFOLIO_DATA = {
  settings: {
    id: 'default',
    personal_name: 'Rawan',
    brand_name: 'Rawan',
    browser_title: 'Rawan | Web Developer Portfolio',
    meta_description: 'Portfolio of Rawan, Web Developer specializing in modern, accessible, and user-friendly web experiences.',
    accent_color: '#2563eb',
    hero_eyebrow: 'WEB DEVELOPER',
    hero_headline: 'Rawan',
    hero_phrases: [
      'I am a Web Developer',
      'I am a UI/UX Enthusiast',
      'I am a Frontend Developer',
      'I am a Problem Solver'
    ],
    hero_intro: "I’m Rawan, a passionate developer who enjoys creating modern, user-friendly websites and turning ideas into practical digital experiences. I’m continuously learning, improving my technical skills, and exploring both frontend and backend development.",
    portrait_url: 'assets/images/portrait-placeholder.jpg',
    logo_url: '',
    about_text_p1: "Hello, I’m Rawan. I’m passionate about programming and web development, especially creating digital experiences that feel clear, useful, and easy to navigate.",
    about_text_p2: "I study Management Information Systems, specializing in Information Systems, with expected graduation in 2027. My studies encourage me to think about how technology, information, and business needs connect.",
    about_text_p3: "I’m learning and applying HTML5, CSS3, JavaScript, and UI/UX fundamentals while exploring frontend workflows, backend concepts, databases, and development tools such as Git and Supabase.",
    about_text_p4: "I enjoy turning ideas into structured interface concepts, improving them through practice, and steadily growing my skills through small projects and experimentation.",
    contact_email: 'contact@example.com',
    footer_text: 'Designed and built with modern standards, accessibility, and clean code.',
    section_visibility: {
      about: true,
      skills: true,
      projects: true,
      contact: true
    },
    nav_labels: {
      home: 'Home',
      about: 'About Me',
      skills: 'Skills & Tech',
      projects: 'Projects',
      contact: 'Contact'
    }
  },

  education: [
    {
      id: 'edu-1',
      qualification: "Bachelor's Degree",
      specialization: "Management Information Systems — Information Systems Track",
      institution: "",
      start_year: 2023,
      graduation_year: 2027,
      status: "Expected graduation: 2027",
      description: "Studying information systems and exploring the relationship between business needs, data, and digital products.",
      display_order: 1,
      is_visible: true
    }
  ],

  skills: [
    // Frontend
    { id: 'sk-1', name: 'HTML5', category: 'Frontend', icon: 'code', proficiency_label: 'Core', description: 'Semantic markup & accessibility', display_order: 1, is_visible: true },
    { id: 'sk-2', name: 'CSS3', category: 'Frontend', icon: 'palette', proficiency_label: 'Core', description: 'Responsive design, Flexbox & Grid', display_order: 2, is_visible: true },
    { id: 'sk-3', name: 'JavaScript', category: 'Frontend', icon: 'code', proficiency_label: 'Core', description: 'ES Modules & DOM Manipulation', display_order: 3, is_visible: true },
    // UI/UX
    { id: 'sk-4', name: 'User Interface Design', category: 'UI/UX', icon: 'layout', proficiency_label: 'Design', description: 'Visual hierarchy & clean layouts', display_order: 4, is_visible: true },
    { id: 'sk-5', name: 'User Experience Design', category: 'UI/UX', icon: 'layout', proficiency_label: 'Design', description: 'Usability & interaction flows', display_order: 5, is_visible: true },
    // Backend
    { id: 'sk-6', name: 'Backend Fundamentals', category: 'Backend', icon: 'terminal', proficiency_label: 'Foundations', description: 'REST APIs, server basics & SQL', display_order: 6, is_visible: true },
    // Tools
    { id: 'sk-7', name: 'Git & GitHub', category: 'Tools', icon: 'github', proficiency_label: 'Tool', description: 'Version control & collaboration', display_order: 7, is_visible: true },
    { id: 'sk-8', name: 'VS Code', category: 'Tools', icon: 'wrench', proficiency_label: 'Tool', description: 'Editor setup & developer workflow', display_order: 8, is_visible: true },
    { id: 'sk-9', name: 'Supabase', category: 'Tools', icon: 'wrench', proficiency_label: 'Tool', description: 'PostgreSQL, Auth & Storage', display_order: 9, is_visible: true },
    { id: 'sk-10', name: 'Responsive Web Design', category: 'Tools', icon: 'layout', proficiency_label: 'Tool', description: 'Mobile-first layout execution', display_order: 10, is_visible: true }
  ],

  projects: [
    {
      id: 'proj-1', title: 'Academia Student Hub', slug: 'academia-student-hub',
      category: 'Dashboard', stage_label: 'Concept case study', year_label: 'Portfolio concept',
      short_description: 'A student dashboard concept that brings course progress, deadlines, and study priorities into one calm workspace.',
      full_description: 'Academia explores how a student can understand their semester at a glance. The proposed interface groups learning progress, course summaries, upcoming tasks, and simple academic indicators into a responsive dashboard.',
      problem: 'Academic information is often scattered between course pages, calendars, and assignment lists. That makes it harder to spot priorities quickly.',
      solution: 'The concept uses a clear hierarchy: a compact overview first, course cards second, and deadlines in a consistent, scannable list. The layout is designed to remain usable on smaller screens.',
      role: 'UI layout, responsive frontend concept, and interaction planning',
      highlights: ['Semester overview cards', 'Course progress indicators', 'Upcoming deadline list', 'Responsive dashboard layout'],
      learning_outcome: 'Practiced information hierarchy, dashboard composition, accessible text contrast, and responsive CSS grid layouts.',
      scope_note: 'Illustrative portfolio concept with sample academic data. It is not connected to a university system or production backend.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX', 'Dashboard'],
      cover_image_url: 'assets/images/project-academia.jpg', gallery_urls: ['assets/images/project-academia.jpg'],
      demo_url: '', repo_url: '', is_featured: true, is_published: true, display_order: 1
    },
    {
      id: 'proj-2', title: 'Nova UI Component Library', slug: 'nova-design-system',
      category: 'Design System', stage_label: 'Concept case study', year_label: 'Portfolio concept',
      short_description: 'A small design-system concept showing how color tokens, spacing, typography, and reusable components can create a consistent interface.',
      full_description: 'Nova is a design-system exploration focused on reusable interface patterns. It documents a compact visual language for buttons, form fields, navigation pills, tags, cards, and feedback states.',
      problem: 'Repeatedly styling similar elements from scratch can lead to inconsistent spacing, type scales, and interaction states.',
      solution: 'The concept organizes visual decisions into CSS custom properties and reusable component rules, then demonstrates how those rules can be applied consistently across a small interface.',
      role: 'Visual system planning and CSS component implementation concept',
      highlights: ['CSS custom property tokens', 'Consistent button and form states', 'Reusable card and tag patterns', 'Keyboard focus styling'],
      learning_outcome: 'Practiced CSS architecture, design tokens, component consistency, and accessibility-minded interaction states.',
      scope_note: 'A learning-oriented design-system concept, not a published package or a production-ready component framework.',
      tags: ['CSS3', 'Design Tokens', 'UI Components', 'Accessibility'],
      cover_image_url: 'assets/images/project-nova.jpg', gallery_urls: ['assets/images/project-nova.jpg'],
      demo_url: '', repo_url: '', is_featured: true, is_published: true, display_order: 2
    },
    {
      id: 'proj-3', title: 'Synchrony Habit & Workflow Planner', slug: 'synchrony-daily-tracker',
      category: 'Productivity', stage_label: 'Concept case study', year_label: 'Portfolio concept',
      short_description: 'A productivity workspace concept that combines daily tasks, habit check-ins, and focused work sessions.',
      full_description: 'Synchrony explores a quieter approach to daily planning. It brings a short task list, a habit overview, and focus-session controls into a compact workspace designed to reduce unnecessary visual noise.',
      problem: 'Complex productivity interfaces can overwhelm people who only need a clear view of today’s priorities and routine.',
      solution: 'The proposed experience keeps the core actions visible, groups related information into small panels, and uses simple completion states rather than dense charts.',
      role: 'UX flow planning and responsive interface concept',
      highlights: ['Daily task grouping', 'Habit completion states', 'Focus-session panel concept', 'Mobile-first content hierarchy'],
      learning_outcome: 'Practiced task-flow design, state visualization, readable spacing, and prioritizing primary actions.',
      scope_note: 'This entry presents the interface idea and case study only; it is not a deployed task manager or a synced productivity service.',
      tags: ['JavaScript', 'CSS Grid', 'UI/UX', 'Productivity'],
      cover_image_url: 'assets/images/project-synchrony.jpg', gallery_urls: ['assets/images/project-synchrony.jpg'],
      demo_url: '', repo_url: '', is_featured: true, is_published: true, display_order: 3
    },
    {
      id: 'proj-4', title: 'CodeNest Learning Hub', slug: 'codenest-learning-hub',
      category: 'Learning Platform', stage_label: 'Concept case study', year_label: 'Portfolio concept',
      short_description: 'A learning dashboard concept for browsing courses, resuming lessons, and keeping track of study goals.',
      full_description: 'CodeNest is a proposed learning space for people developing practical digital skills. The interface organizes course categories, current progress, saved learning paths, and weekly goals in one consistent layout.',
      problem: 'Learners can lose momentum when progress, saved resources, and next steps are difficult to find.',
      solution: 'The concept prioritizes a clear “continue learning” area, compact progress indicators, and a small set of categories so the next action remains easy to identify.',
      role: 'Frontend layout concept and UI/UX planning',
      highlights: ['Course cards and categories', 'Progress bars', 'Weekly learning goal panel', 'Responsive navigation concept'],
      learning_outcome: 'Practiced reusable course-card patterns, visual progress indicators, and organizing content for repeat visits.',
      scope_note: 'Sample learning-platform concept using illustrative course data; there is no real course catalog, account, or learning backend.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
      cover_image_url: 'assets/images/concepts/codenest-learning-hub.svg', gallery_urls: ['assets/images/concepts/codenest-learning-hub.svg'],
      demo_url: '', repo_url: '', is_featured: true, is_published: true, display_order: 4
    },
    {
      id: 'proj-5', title: 'Bloom Budget Planner', slug: 'bloom-budget-planner',
      category: 'Finance UI', stage_label: 'Concept case study', year_label: 'Portfolio concept',
      short_description: 'A personal-budget dashboard concept with category summaries, savings goals, and a readable recent-activity list.',
      full_description: 'Bloom explores how a personal-finance interface can make everyday money decisions feel more understandable. The proposed dashboard presents a monthly summary, category proportions, savings progress, and recent transactions.',
      problem: 'Dense financial dashboards can make it difficult to distinguish essentials, discretionary spending, and savings priorities.',
      solution: 'The concept combines high-contrast summary numbers with a small category visualization and a short activity list, using labels and spacing to make each information group distinct.',
      role: 'Dashboard layout and information-design concept',
      highlights: ['Monthly balance summary', 'Spending category visualization', 'Savings-goal card', 'Readable transaction rows'],
      learning_outcome: 'Practiced data presentation, chart-label clarity, neutral visual design, and accessible contrast for dashboard interfaces.',
      scope_note: 'All balances and transactions shown in the artwork are fictional placeholders. This concept does not connect to bank accounts or process financial data.',
      tags: ['UI/UX', 'CSS Grid', 'Data Visualization', 'Dashboard'],
      cover_image_url: 'assets/images/concepts/bloom-budget-planner.svg', gallery_urls: ['assets/images/concepts/bloom-budget-planner.svg'],
      demo_url: '', repo_url: '', is_featured: false, is_published: true, display_order: 5
    },
    {
      id: 'proj-6', title: 'FreshCart Storefront', slug: 'freshcart-storefront',
      category: 'E-commerce UI', stage_label: 'Concept case study', year_label: 'Portfolio concept',
      short_description: 'A storefront interface concept with product cards, category navigation, search presentation, and a compact cart affordance.',
      full_description: 'FreshCart is a visual exploration of a friendly and easy-to-scan online shop. The concept focuses on product imagery, concise product information, simple category navigation, and clear pricing.',
      problem: 'Product listings become difficult to scan when image sizes, descriptions, categories, and prices are not presented consistently.',
      solution: 'The proposed storefront uses a predictable card layout, restrained category controls, visible prices, and a simplified top navigation to support product discovery.',
      role: 'Responsive storefront UI concept and component styling',
      highlights: ['Responsive product-card grid', 'Category navigation concept', 'Search field presentation', 'Consistent price and product labels'],
      learning_outcome: 'Practiced catalog hierarchy, card consistency, responsive grids, and accessible naming for shopping controls.',
      scope_note: 'Illustrative storefront only. Product names and prices are fictional, and checkout, inventory, search, and payment are not connected or functional.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce UI'],
      cover_image_url: 'assets/images/concepts/freshcart-storefront.svg', gallery_urls: ['assets/images/concepts/freshcart-storefront.svg'],
      demo_url: '', repo_url: '', is_featured: false, is_published: true, display_order: 6
    }
  ],

  socials: [
    { id: 'soc-1', platform: 'GitHub', url: 'https://github.com', display_order: 1, is_enabled: true },
    { id: 'soc-2', platform: 'LinkedIn', url: 'https://linkedin.com', display_order: 2, is_enabled: true },
    { id: 'soc-3', platform: 'X', url: 'https://x.com', display_order: 3, is_enabled: true },
    { id: 'soc-4', platform: 'Instagram', url: 'https://instagram.com', display_order: 4, is_enabled: true },
    { id: 'soc-5', platform: 'Email', url: 'mailto:contact@example.com', display_order: 5, is_enabled: true }
  ]
};

const clone = (value) => JSON.parse(JSON.stringify(value));

class MockPortfolioContent {
  async getSettings() { return clone(MOCK_PORTFOLIO_DATA.settings); }
  async getProjects() { return clone(MOCK_PORTFOLIO_DATA.projects.filter((project) => project.is_published)); }
  async getProjectBySlug(slug) {
    const project = MOCK_PORTFOLIO_DATA.projects.find((item) => item.slug === slug && item.is_published);
    return project ? clone(project) : null;
  }
  async getSkills() { return clone(MOCK_PORTFOLIO_DATA.skills.filter((skill) => skill.is_visible)); }
  async getEducation() { return clone(MOCK_PORTFOLIO_DATA.education.filter((item) => item.is_visible)); }
  async getSocialLinks() { return clone(MOCK_PORTFOLIO_DATA.socials.filter((item) => item.is_enabled)); }

  async submitContactMessage(formData) {
    const name = validateField(formData?.name, { required: true, maxLength: 100 });
    if (!name.valid) throw new Error(name.error);
    const email = validateField(formData?.email, { required: true, email: true, maxLength: 254 });
    if (!email.valid) throw new Error(email.error);
    const subject = validateField(formData?.subject || '', { maxLength: 200 });
    if (!subject.valid) throw new Error(subject.error);
    const message = validateField(formData?.message, { required: true, minLength: 10, maxLength: 3000 });
    if (!message.valid) throw new Error(message.error);
    // Do not persist or transmit submitted personal data in this frontend-only demo.
    return {
      success: false,
      demo: true,
      message: 'This GitHub version is frontend-only. Your message was not sent or stored. Please use the email link instead.'
    };
  }
}

export const publicContent = new MockPortfolioContent();
