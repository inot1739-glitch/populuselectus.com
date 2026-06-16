// PopulusElectus — Article Database
// كل مرة تضيف مقال جديد، زيد سطر واحد هنا فقط

const articles = [
  { title: "How to Build Good Habits That Actually Stick", category: "Mindset", url: "/how-to-build-good-habits.html" },
  { title: "Growth Mindset vs Fixed Mindset: Which One Are You?", category: "Mindset", url: "/growth-mindset-vs-fixed-mindset.html" },
  { title: "How to Wake Up Early (And Actually Feel Good About It)", category: "Productivity", url: "/how-to-wake-up-early.html" },
  { title: "How to Stop Procrastinating Once and For All", category: "Productivity", url: "/how-to-stop-procrastinating.html" },
  { title: "Best Productivity Tips That Actually Work in 2026", category: "Productivity", url: "/best-productivity-tips.html" },
  { title: "How to Ask for a Raise and Actually Get It", category: "Career Growth", url: "/how-to-ask-for-a-raise.html" },
  { title: "Index Fund Investing for Beginners", category: "Financial Literacy", url: "/index-fund-investing-beginners.html" },
];

// Auto-count categories
function countByCategory() {
  const counts = {};
  articles.forEach(a => {
    counts[a.category] = (counts[a.category] || 0) + 1;
  });
  return counts;
}

// Update category counts on any page
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

// Run on page load
document.addEventListener('DOMContentLoaded', updateCategoryCounts);
