'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogPage() {
  const posts = [
    {
      title: "Top 10 Tech Gadgets of 2025",
      excerpt: "Discover the must-have technology products that are revolutionizing the way we live and work.",
      date: "November 8, 2025",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800"
    },
    {
      title: "Sustainable Shopping: Making Eco-Friendly Choices",
      excerpt: "Learn how to make environmentally conscious purchasing decisions without compromising on quality.",
      date: "November 5, 2025",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800"
    },
    {
      title: "Home Office Setup Guide",
      excerpt: "Create the perfect workspace with our comprehensive guide to home office essentials.",
      date: "November 1, 2025",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800"
    },
    {
      title: "Fashion Trends for the Modern Professional",
      excerpt: "Stay stylish and professional with these timeless wardrobe essentials.",
      date: "October 28, 2025",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"
    },
    {
      title: "Fitness at Home: Essential Equipment",
      excerpt: "Build your home gym with these versatile and space-saving fitness products.",
      date: "October 25, 2025",
      category: "Health",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800"
    },
    {
      title: "Gift Guide: Perfect Presents for Everyone",
      excerpt: "Find the ideal gift for any occasion with our curated selection of thoughtful products.",
      date: "October 20, 2025",
      category: "Shopping",
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Our Blog</h1>
          <p className="text-gray-400 text-lg">
            Tips, trends, and insights to enhance your shopping experience
          </p>
        </div>
        
        {/* Featured Post */}
        <div className="mb-12 bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-purple-500/50 transition-all">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 md:h-auto">
              <img
                src={posts[0].image}
                alt={posts[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full">
                  Featured
                </span>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-purple-400 text-sm font-semibold mb-2">{posts[0].category}</span>
              <h2 className="text-3xl font-bold text-white mb-4">{posts[0].title}</h2>
              <p className="text-gray-300 mb-4">{posts[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">{posts[0].date}</span>
                <button className="text-purple-400 hover:text-purple-300 font-semibold">
                  Read More →
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post, index) => (
            <div
              key={index}
              className="bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-purple-500/50 transition-all hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-purple-400 text-sm font-semibold">{post.category}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs">{post.date}</span>
                  <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-purple-700/20 border border-purple-500/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 mb-6">
            Get the latest articles, product updates, and exclusive deals delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
