import React, { useState, useEffect } from 'react';
import { BlogPost, Citation } from '../types';
import { INITIAL_BLOGS } from '../data/blogData';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Calendar, Clock, User, Feather, Plus, X, ChevronRight, Share2, Quote } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { canPublishCMS, currentUser } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [articleScrollProgress, setArticleScrollProgress] = useState<number>(0);

  // Auto-selection listener from Global Search
  useEffect(() => {
    const handleSelectBlog = (e: Event) => {
      const customEvent = e as CustomEvent<BlogPost>;
      if (customEvent.detail) {
        setSelectedPost(customEvent.detail);
      }
    };
    window.addEventListener('chengmi-blog-select', handleSelectBlog);
    return () => window.removeEventListener('chengmi-blog-select', handleSelectBlog);
  }, []);

  useEffect(() => {
    setArticleScrollProgress(0);
  }, [selectedPost]);

  // New Post modal state
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState('Toponymy & Culture');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [refAuthor, setRefAuthor] = useState('');
  const [refTitle, setRefTitle] = useState('');
  const [refYear, setRefYear] = useState('');

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      alert('Please fill out the title and content for the dispatch.');
      return;
    }

    const citation: Citation = {
      sourceType: 'Academic Journal',
      authorOrBody: refAuthor.trim() || currentUser?.name || 'Archival Contributor',
      title: refTitle.trim() || newTitle,
      year: refYear.trim() || '2025',
      shelfmarkOrCallNumber: 'CHENGMI-DISP-REF',
    };

    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || newExcerpt.slice(0, 80),
      author: currentUser?.name || 'Doniel Tripura',
      authorRole: currentUser?.role === 'super_admin' ? 'Chief Archivist & Historian' : 'Senior Contributor',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      category: newCategory,
      excerpt: newExcerpt.trim(),
      content: newContent.trim(),
      references: [citation],
      status: 'published',
    };

    setPosts(prev => [newPost, ...prev]);
    setIsComposeOpen(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewExcerpt('');
    setNewContent('');
    setRefAuthor('');
    setRefTitle('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 pb-16 transition-colors">
      {/* Blog Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6 pt-4">
        <div className="space-y-1">
          <div className="text-xs font-serif uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold">
            Historical Essays & Scholarly Field Notes
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 dark:text-stone-100">
            Scholarly Dispatches
          </h1>
          <p className="text-sm font-serif text-stone-600 dark:text-stone-400 max-w-2xl">
            Critical essays and field monographs on the indigenous toponymy of Chengmi, customary chieftaincy in the Mong Circle, and the administrative evolution of the Chittagong Hill Tracts.
          </p>
        </div>

        {canPublishCMS() && (
          <button
            onClick={() => setIsComposeOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-700 dark:hover:bg-stone-600 rounded-xl transition-colors cursor-pointer self-start md:self-auto shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Compose Dispatch</span>
          </button>
        )}
      </div>

      {/* Featured Lead Story */}
      {posts[0] && (
        <article
          id={`blog-post-${posts[0].id}`}
          onClick={() => setSelectedPost(posts[0])}
          className="p-8 sm:p-10 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 border-2 border-amber-300 dark:border-amber-800/80 rounded-2xl space-y-5 hover:border-amber-500 hover:shadow-xl transition-all duration-300 cursor-pointer group scroll-mt-28"
        >
          <div className="flex flex-wrap items-center gap-2 text-xs font-serif text-stone-500 dark:text-stone-400">
            <span className="text-amber-900 dark:text-amber-300 font-bold uppercase tracking-wider text-[11px] bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
              Featured Monograph
            </span>
            <span>·</span>
            <span className="font-semibold text-stone-700 dark:text-stone-300">{posts[0].category}</span>
            <span>·</span>
            <span>{posts[0].date}</span>
            <span>·</span>
            <span>{posts[0].readTime}</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-tight">
              {posts[0].title}
            </h2>
            <p className="text-base font-serif text-stone-600 dark:text-stone-300 italic">
              {posts[0].subtitle}
            </p>
          </div>

          <p className="text-sm font-serif text-stone-700 dark:text-stone-300 leading-relaxed max-w-3xl line-clamp-3">
            {posts[0].excerpt}
          </p>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-serif text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 dark:text-stone-100">{posts[0].author}</span>
              <span className="text-stone-400">({posts[0].authorRole})</span>
            </div>

            <span className="font-sans font-bold text-stone-900 dark:text-stone-100 group-hover:underline flex items-center gap-1">
              Read Complete Essay <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </article>
      )}

      {/* Secondary Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.slice(1).map((post) => (
          <article
            key={post.id}
            id={`blog-post-${post.id}`}
            onClick={() => setSelectedPost(post)}
            className="p-6 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl space-y-4 hover:border-amber-400 dark:hover:border-amber-700 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between scroll-mt-28"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-serif text-stone-500 dark:text-stone-400">
                <span className="text-amber-900 dark:text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-[11px]">{post.category}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-xl font-serif font-black text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-xs font-serif text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-serif text-stone-500 dark:text-stone-400">
              <span className="font-medium text-stone-700 dark:text-stone-300">By {post.author}</span>
              <span className="font-sans font-bold text-stone-800 dark:text-stone-200 group-hover:underline">
                Read Article →
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Reading Article Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            onScroll={(e) => {
              const el = e.currentTarget;
              const total = el.scrollHeight - el.clientHeight;
              if (total > 0) {
                setArticleScrollProgress(Math.min(100, Math.max(0, (el.scrollTop / total) * 100)));
              }
            }}
            className="bg-[#FBF9F5] border border-stone-300 rounded-xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-10 space-y-8 shadow-xl relative"
          >
            {/* Sticky Reading Progress Indicator inside Article Reader */}
            <div className="sticky -top-6 sm:-top-10 -mx-6 sm:-mx-10 z-30 h-1 bg-stone-200/80">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 shadow-[0_0_8px_rgba(217,119,6,0.6)] transition-all duration-100 ease-out"
                style={{ width: `${articleScrollProgress}%` }}
              />
            </div>

            {/* Header */}
            <div className="space-y-4 border-b border-stone-200 pb-6 relative">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute right-0 top-0 p-1 text-stone-400 hover:text-stone-800 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-serif tracking-widest uppercase text-amber-900 font-semibold">
                {selectedPost.category} · Published {selectedPost.date}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 leading-tight">
                {selectedPost.title}
              </h1>

              <p className="text-base font-serif italic text-stone-600 leading-relaxed">
                {selectedPost.subtitle}
              </p>

              <div className="flex items-center gap-3 pt-2 text-xs font-serif text-stone-600">
                <span className="font-semibold text-stone-900">{selectedPost.author}</span>
                <span>·</span>
                <span>{selectedPost.authorRole}</span>
                <span>·</span>
                <span>{selectedPost.readTime}</span>
              </div>
            </div>

            {/* Prose Content */}
            <div className="text-stone-800 font-serif text-sm sm:text-base leading-loose space-y-5 max-w-2xl mx-auto">
              {selectedPost.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-xl font-serif font-bold text-stone-900 pt-4 pb-1 border-b border-stone-200">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('> ')) {
                  return (
                    <blockquote key={idx} className="my-4 border-l-3 border-amber-900 pl-4 py-1 italic text-stone-700 bg-stone-100/60 rounded-r">
                      {paragraph.replace('> ', '')}
                    </blockquote>
                  );
                }
                return (
                  <p key={idx} className={idx === 0 ? 'first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-stone-900' : ''}>
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Citations & Footnotes */}
            <div className="pt-6 border-t border-stone-200 space-y-3">
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                <span>Scholarly References & Primary Footnotes</span>
              </h4>

              <div className="space-y-2">
                {selectedPost.references.map((ref, i) => (
                  <div key={i} className="p-3 bg-white border border-stone-200 rounded text-xs font-serif text-stone-700 space-y-0.5">
                    <div>
                      {ref.authorOrBody} ({ref.year}). <em>{ref.title}</em>.
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Call Number: {ref.shelfmarkOrCallNumber} {ref.pageOrFolio && `· ${ref.pageOrFolio}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-stone-200">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-200 hover:bg-stone-300 rounded transition-colors cursor-pointer"
              >
                Close Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compose Dispatch Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FBF9F5] border border-stone-300 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Compose Scholarly Dispatch
                </h3>
                <p className="text-xs font-serif text-stone-500">
                  Publish a field monograph or historical essay to the repository.
                </p>
              </div>
              <button
                onClick={() => setIsComposeOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-800 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleComposeSubmit} className="space-y-4 text-xs font-serif">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Essay Title *</label>
                <input
                  type="text"
                  placeholder="e.g. The Architecture of Manikchari Rajbari"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Subtitle / Academic Deck</label>
                <input
                  type="text"
                  placeholder="e.g. Timber craftsmanship and customary court spatial layouts in the Mong Circle"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Field Category</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Author Credit</label>
                  <input
                    type="text"
                    value={currentUser?.name || 'Doniel Tripura'}
                    disabled
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-300 rounded text-stone-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Executive Summary / Excerpt *</label>
                <textarea
                  rows={2}
                  placeholder="A concise summary of the thesis and findings..."
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Complete Essay Body (Prose with Markdown) *</label>
                <textarea
                  rows={6}
                  placeholder="Write the full scholarly text. Use ### for subheadings and > for pull quotes..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 font-serif leading-relaxed"
                  required
                />
              </div>

              {/* Reference */}
              <div className="p-3 bg-stone-100 border border-stone-300 rounded space-y-2">
                <span className="font-semibold text-stone-900 block text-xs">
                  Primary Scholarly Citation / Authority
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Author (e.g. Dr. Lorenz Löffler)"
                    value={refAuthor}
                    onChange={(e) => setRefAuthor(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-stone-300 rounded col-span-1"
                  />
                  <input
                    type="text"
                    placeholder="Source Title / Journal"
                    value={refTitle}
                    onChange={(e) => setRefTitle(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-stone-300 rounded col-span-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsComposeOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-stone-700 hover:bg-stone-200 rounded transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors cursor-pointer"
                >
                  Publish Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
