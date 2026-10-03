import React, { useState, useEffect } from 'react';
import { Language, CommunityPost, FarmerProfile } from '../types';
import { Heart, MessageSquare, Share2, Plus, Check, ShieldCheck, Send, X, ExternalLink, Copy, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SocialSharingFeedProps {
  language: Language;
  currentFarmer: FarmerProfile;
  isOpenAsModal?: boolean;
  onClose?: () => void;
}

export const SocialSharingFeed: React.FC<SocialSharingFeedProps> = ({
  language,
  currentFarmer,
  isOpenAsModal,
  onClose,
}) => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [activeSharePost, setActiveSharePost] = useState<CommunityPost | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  // Form State for new post
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Pest Alerts 🚨');
  const [newCrop, setNewCrop] = useState(currentFarmer.crop);

  const categories = [
    'All',
    'Pest Alerts 🚨',
    'Irrigation 💧',
    'Organic / Bio 🌿',
    'Success Stories 🏆',
  ];

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/feed');
      const data = await res.json();
      if (data && data.posts) {
        setPosts(data.posts);
      }
    } catch (e) {
      // Fallback in-memory
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    try {
      const res = await fetch(`/api/feed/${postId}/like`, { method: 'POST' });
      const data = await res.json();
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, likes: data.likes, userLiked: data.userLiked } : p
        )
      );
      if (data.userLiked) {
        try {
          confetti({
            particleCount: 20,
            spread: 30,
            origin: { y: 0.8 },
            colors: ['#ef4444', '#f59e0b', '#52b788'],
          });
        } catch {}
      }
    } catch (e) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, userLiked: !p.userLiked, likes: p.userLiked ? p.likes - 1 : p.likes + 1 }
            : p
        )
      );
    }
  };

  const handleAddComment = async (postId: string) => {
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;

    try {
      const res = await fetch(`/api/feed/${postId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, author: currentFarmer.name }),
      });
      const data = await res.json();
      if (data && data.comment) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, comments: [...p.comments, data.comment] } : p
          )
        );
        setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
      }
    } catch (e) {
      const fallbackComment = {
        id: `c-${Date.now()}`,
        author: currentFarmer.name,
        text,
        timeAgo: 'Just now',
      };
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, comments: [...p.comments, fallbackComment] } : p
        )
      );
      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      const res = await fetch('/api/feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          category: newCategory,
          crop: newCrop,
          authorName: currentFarmer.name,
          authorDistrict: `${currentFarmer.district}, ${currentFarmer.state}`,
        }),
      });
      const data = await res.json();
      if (data && data.post) {
        setPosts((prev) => [data.post, ...prev]);
      }
    } catch (e) {
      const offlinePost: CommunityPost = {
        id: `post-${Date.now()}`,
        authorName: currentFarmer.name,
        authorDistrict: `${currentFarmer.district}, ${currentFarmer.state}`,
        authorAvatar: currentFarmer.avatar,
        crop: newCrop,
        category: newCategory,
        timeAgo: 'Just now',
        title: newTitle,
        content: newContent,
        likes: 1,
        userLiked: true,
        comments: [],
        sharesCount: 0,
        verifiedFarmer: true,
      };
      setPosts((prev) => [offlinePost, ...prev]);
    }

    setNewTitle('');
    setNewContent('');
    setShowCreateModal(false);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#52b788', '#2d6a4f', '#f59e0b'],
      });
    } catch {}
  };

  const handleCopyShareLink = (post: CommunityPost) => {
    const shareText = `🌾 [AgriGuardian Krishi Chaupal] ${post.title} - Shared by ${post.authorName} (${post.crop}):\n"${post.content}"\nCheck out the farm advisory: https://agriguardian.ai`;
    navigator.clipboard?.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredPosts = posts.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category.includes(selectedCategory.split(' ')[0]);
  });

  const content = (
    <div className="space-y-5 py-4">
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider block">
              {language === 'hi' ? 'कृषि चौपाल' : 'Krishi Chaupal'}
            </span>
            <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Users className="w-3 h-3 text-emerald-700" />
              <span>Verified Farmers Network</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2e1b] tracking-tight mt-0.5">
            {language === 'hi' ? 'किसान समुदाय व अनुभव' : 'Farmer Community Knowledge Exchange'}
          </h2>
          <p className="text-xs sm:text-sm text-[#143d22]/80 mt-1 max-w-2xl">
            {language === 'hi'
              ? 'कीट चेतावनी, सिंचाई बचत और जैविक उपायों का वास्तविक समय में आदान-प्रदान।'
              : 'Share pest alerts, water-saving milestones & organic remedies with local farmers.'}
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="py-3 px-5 bg-[#2d6a4f] hover:bg-[#143d22] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'hi' ? 'नई पोस्ट लिखें' : 'Create New Post'}</span>
        </button>
      </div>

      {/* Category Pills Filter */}
      <div className="overflow-x-auto no-scrollbar py-1 flex gap-2 sm:gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#143d22] text-white shadow-xs'
                : 'bg-white border border-[#0f2e1b]/10 text-[#0f2e1b] hover:bg-[#faf8f2] hover:border-[#2d6a4f]/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid: 1 col on mobile, 2 cols on md, 3 cols on lg */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-[#0f2e1b]/10 shadow-xs hover:shadow-lg hover:border-[#2d6a4f]/30 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Post Author Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#0f2e1b]/5">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-[#faf8f2] border border-[#0f2e1b]/10 flex items-center justify-center text-xl shadow-2xs">
                    {post.authorAvatar || '👨🌾'}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-[#0f2e1b] text-sm">
                        {post.authorName}
                      </h3>
                      {post.verifiedFarmer && (
                        <span title="Verified Landholder">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#143d22]/60">
                      {post.authorDistrict} · {post.timeAgo}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold bg-[#d8f3dc] text-[#1b4332] px-2.5 py-1 rounded-full shrink-0">
                  {post.crop}
                </span>
              </div>

              {/* Post Title & Content */}
              <div className="py-3.5">
                <span className="text-[10px] font-extrabold uppercase text-[#2d6a4f] block mb-1">
                  {post.category}
                </span>
                <h4 className="font-extrabold text-[#0f2e1b] text-base leading-snug">
                  {post.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#143d22]/85 leading-relaxed mt-2 whitespace-pre-line">
                  {post.content}
                </p>
              </div>
            </div>

            <div>
              {/* Interaction Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-[#0f2e1b]/5 text-xs sm:text-sm">
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 font-bold transition-transform active:scale-125 cursor-pointer ${
                      post.userLiked ? 'text-rose-600' : 'text-[#143d22]/70 hover:text-rose-600'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${post.userLiked ? 'fill-rose-600' : ''}`}
                    />
                    <span>{post.likes}</span>
                  </button>

                  {/* Comment Toggle Button */}
                  <button
                    onClick={() =>
                      setExpandedComments((prev) => ({
                        ...prev,
                        [post.id]: !prev[post.id],
                      }))
                    }
                    className="flex items-center gap-1.5 font-bold text-[#143d22]/70 hover:text-[#2d6a4f] cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{post.comments.length}</span>
                  </button>
                </div>

                {/* Social Share Button */}
                <button
                  onClick={() => setActiveSharePost(post)}
                  className="flex items-center gap-1.5 font-bold text-[#2d6a4f] hover:text-[#143d22] bg-[#f5f2e9] hover:bg-[#ede8dc] px-3 py-1.5 rounded-xl transition-colors cursor-pointer text-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'शेयर करें' : 'Share'}</span>
                </button>
              </div>

              {/* Expandable Comments Drawer */}
              {expandedComments[post.id] && (
                <div className="mt-3 pt-3 border-t border-[#0f2e1b]/5 space-y-2 bg-[#faf8f2] p-3 rounded-2xl">
                  <span className="text-xs font-bold text-[#0f2e1b] block">
                    Replies ({post.comments.length})
                  </span>

                  {post.comments.length === 0 ? (
                    <p className="text-xs text-[#143d22]/50 italic">
                      {language === 'hi' ? 'कोई टिप्पणी नहीं। सबसे पहले अपनी सलाह दें!' : 'No replies yet. Share your experience!'}
                    </p>
                  ) : (
                    post.comments.map((c) => (
                      <div key={c.id} className="text-xs bg-white p-2.5 rounded-xl border border-[#0f2e1b]/5">
                        <div className="flex justify-between text-[10px] text-[#143d22]/60 font-semibold mb-0.5">
                          <span className="font-bold text-[#0f2e1b]">{c.author}</span>
                          <span>{c.timeAgo}</span>
                        </div>
                        <p className="text-[#143d22]/90 leading-snug">{c.text}</p>
                      </div>
                    ))
                  )}

                  {/* Add Comment Input */}
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      placeholder={language === 'hi' ? 'कृषि सलाह या प्रतिक्रिया लिखें...' : 'Write an agricultural reply...'}
                      className="flex-1 bg-white border border-[#0f2e1b]/10 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="p-2 bg-[#2d6a4f] text-white rounded-xl hover:bg-[#143d22] transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Modal: Create Post */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#0f2e1b]/10">
            <div className="flex items-center justify-between pb-3 border-b border-[#0f2e1b]/10">
              <h3 className="font-extrabold text-[#0f2e1b] text-base sm:text-lg">
                {language === 'hi' ? 'कृषि चौपाल में नई पोस्ट साझा करें' : 'Post to Krishi Chaupal Community'}
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-[#f5f2e9] text-[#0f2e1b] flex items-center justify-center font-bold hover:bg-[#ede8dc]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3.5 pt-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-[#0f2e1b] block mb-1">
                  {language === 'hi' ? 'श्रेणी (Category)' : 'Category:'}
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#faf8f2] border border-[#0f2e1b]/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#0f2e1b]"
                >
                  <option value="Pest Alerts 🚨">Pest Alerts 🚨 (कीट चेतावनी)</option>
                  <option value="Irrigation 💧">Irrigation 💧 (सिंचाई बचत)</option>
                  <option value="Organic / Bio 🌿">Organic / Bio 🌿 (जैविक खेती)</option>
                  <option value="Success Stories 🏆">Success Stories 🏆 (सफलता की कहानी)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#0f2e1b] block mb-1">
                  {language === 'hi' ? 'शीर्षक (Title)' : 'Headline:'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={language === 'hi' ? 'उदा. सेक्टर 4 में येलो रस्ट देखा गया' : 'e.g. Yellow Rust observed in Sector 4'}
                  className="w-full bg-[#faf8f2] border border-[#0f2e1b]/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#0f2e1b]"
                />
              </div>

              <div>
                <label className="font-bold text-[#0f2e1b] block mb-1">
                  {language === 'hi' ? 'फसल (Crop)' : 'Crop Cultivar:'}
                </label>
                <input
                  type="text"
                  required
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="w-full bg-[#faf8f2] border border-[#0f2e1b]/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#0f2e1b]"
                />
              </div>

              <div>
                <label className="font-bold text-[#0f2e1b] block mb-1">
                  {language === 'hi' ? 'अनुभव / सलाह विवरण' : 'Farmer Advisory Description:'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder={
                    language === 'hi'
                      ? 'अपनी फसल की स्थिति, लक्षण या अपनाई गई दवा/सिंचाई की जानकारी लिखें...'
                      : 'Describe what you noticed in your field, dosage sprayed, or water delayed...'
                  }
                  className="w-full bg-[#faf8f2] border border-[#0f2e1b]/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#0f2e1b]"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 rounded-xl border border-[#0f2e1b]/20 font-bold text-xs sm:text-sm text-[#0f2e1b]"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#2d6a4f] text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer hover:bg-[#143d22]"
                >
                  {language === 'hi' ? 'समुदाय में प्रकाशित करें' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Social Share Card */}
      {activeSharePost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 sm:p-6 shadow-2xl border border-[#0f2e1b]/10 text-center">
            <div className="flex justify-between items-center pb-2 mb-3 border-b border-[#0f2e1b]/10">
              <span className="font-extrabold text-sm sm:text-base text-[#0f2e1b]">Share With Fellow Farmers</span>
              <button
                onClick={() => setActiveSharePost(null)}
                className="w-8 h-8 rounded-full bg-[#f5f2e9] flex items-center justify-center font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Card */}
            <div className="bg-[#fcfbf8] border border-[#2d6a4f]/30 rounded-2xl p-4 text-left mb-4 shadow-inner">
              <div className="flex items-center gap-1.5 text-[10px] text-[#2d6a4f] font-bold mb-1">
                <span>🌱 AgriGuardian Chaupal</span>
                <span>·</span>
                <span>{activeSharePost.crop}</span>
              </div>
              <h4 className="font-black text-xs sm:text-sm text-[#0f2e1b]">{activeSharePost.title}</h4>
              <p className="text-xs text-[#143d22]/80 mt-1 line-clamp-3">"{activeSharePost.content}"</p>
              <div className="mt-2.5 pt-2 border-t border-[#0f2e1b]/5 flex justify-between text-[10px] text-[#143d22]/60">
                <span>Author: {activeSharePost.authorName}</span>
                <span className="text-emerald-700 font-bold">Verified Landholder</span>
              </div>
            </div>

            {/* Share Options */}
            <div className="space-y-2.5">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `🌾 *AgriGuardian Farmer Alert*\n*${activeSharePost.title}*\n${activeSharePost.content}\n\nShared by ${activeSharePost.authorName} (${activeSharePost.authorDistrict})\nCheck live farm advisory: https://agriguardian.ai`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>💬</span>
                <span>Share via WhatsApp</span>
              </a>

              <button
                onClick={() => handleCopyShareLink(activeSharePost)}
                className="w-full py-3 px-4 bg-[#f5f2e9] hover:bg-[#ede8dc] text-[#0f2e1b] font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Share Text</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isOpenAsModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
        <div className="bg-[#faf8f2] rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-[#0f2e1b]/10 max-h-[92vh] overflow-y-auto">
          <div className="flex justify-end mb-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white text-[#0f2e1b] border border-[#0f2e1b]/10 hover:bg-[#f5f2e9] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return <section id="community-feed">{content}</section>;
};
