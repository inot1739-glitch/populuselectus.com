// PopulusElectus — Article Database
// كل مرة تضيف مقال جديد، زيد سطر واحد هنا فقط

const articles = [
    {
    title: "How to Build Good Habits That Actually Stick",
    category: "Mindset",
    url: "/how-to-build-good-habits.html",
    excerpt: "Science-backed strategies to rewire your brain for lasting habits — no willpower required.",
    date: "June 14, 2026",
    readTime: "8 min",
    icon: "🧠"
  },
  {
    title: "Growth Mindset vs Fixed Mindset: Which One Are You?",
    category: "Mindset",
    url: "/growth-mindset-vs-fixed-mindset.html",
    excerpt: "The single belief that separates people who improve from people who stay stuck.",
    date: "June 15, 2026",
    readTime: "7 min",
    icon: "🌱"
  },
  {
    title: "How to Wake Up Early (And Actually Feel Good About It)",
    category: "Productivity",
    url: "/how-to-wake-up-early.html",
    excerpt: "The science of sleep cycles and a system to become a natural early riser.",
    date: "June 14, 2026",
    readTime: "7 min",
    icon: "⚡"
  },
  {
    title: "How to Stop Procrastinating Once and For All",
    category: "Productivity",
    url: "/how-to-stop-procrastinating.html",
    excerpt: "Stop avoiding tasks and start taking action with these science-backed strategies.",
    date: "June 16, 2026",
    readTime: "8 min",
    icon: "🎯"
  },
  {
    title: "Best Productivity Tips That Actually Work in 2026",
    category: "Productivity",
    url: "/best-productivity-tips.html",
    excerpt: "No fluff, no gimmicks — just the strategies proven to make you do more of what matters.",
    date: "June 13, 2026",
    readTime: "9 min",
    icon: "📋"
  },
  {
    title: "How to Ask for a Raise and Actually Get It",
    category: "Career Growth",
    url: "/how-to-ask-for-a-raise.html",
    excerpt: "The exact scripts and strategies that turn a nerve-wracking conversation into a yes.",
    date: "June 16, 2026",
    readTime: "8 min",
    icon: "💼"
  },
  {
    title: "Index Fund Investing for Beginners",
    category: "Financial Literacy",
    url: "/index-fund-investing-beginners.html",
    excerpt: "The simplest way to build long-term wealth — with zero stock-picking required.",
    date: "June 16, 2026",
    readTime: "9 min",
    icon: "💰"
  },
  { title: "How to Budget Your Money: The Simple 50/30/20 Rule", category: "Financial Literacy", url: "/how-to-budget-money.html", excerpt: "The only budgeting system you'll ever need.", date: "June 16, 2026", readTime: "7 min", icon: "💵" },
  { title: "How to Optimize Your LinkedIn Profile to Get Noticed in 2026", category: "Career Growth", url: "/linkedin-profile-tips.html", excerpt: "What recruiters actually look at.", date: "June 16, 2026", readTime: "8 min", icon: "💼" },
];

// Auto-count categories
function countByCategory() {
  const counts = {};
  articles.forEach(a => {
    counts[a.category] = (counts[a.category] || 0) + 1;
  });
  return counts;
}

// Update category counts
function updateCategoryCounts() {
  const counts = countByCategory();
  document.querySelectorAll('.cat-card').forEach(card => {
    const name = card.querySelector('.cat-name')?.textContent.trim();
    const countEl = card.querySelector('.cat-count');
    if (name && countEl && counts[name]) {
      countEl.textContent = counts[name] + ' article' + (counts[name] > 1 ? 's' : '');
    }
  });
}

// Auto-fill Latest section with last 3 articles
function fillLatestSection() {
  const latestGrid = document.querySelector('.latest-grid');
  if (!latestGrid) return;

  const latest = [...articles].slice(-3).reverse();
  latestGrid.innerHTML = latest.map(a => `
    <a href="${a.url}" class="post-card">
      <div class="post-thumb-inner" style="background:linear-gradient(135deg,#2b5f3e,#163222);width:100%;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;font-size:2.5rem;color:rgba(255,255,255,0.15)">${a.icon}</div>
      <div class="post-body">
        <span class="post-tag">${a.category}</span>
        <h3 class="post-title">${a.title}</h3>
        <p class="post-excerpt">${a.excerpt}</p>
        <div class="post-meta"><span>${a.date}</span><span>· ${a.readTime} read</span></div>
      </div>
    </a>
  `).join('');
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCategoryCounts();
  fillLatestSection();
});
