
import React from 'react';
import { Book, BookOpenText, Bookmark, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: 'Resume Writing Tips',
    summary: 'Learn how to create a resume that stands out to potential employers.',
    image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=2070',
    readTime: '5 min read',
    category: 'Career Tips'
  },
  {
    id: 2,
    title: 'Interview Preparation',
    summary: 'Tips and tricks to help you prepare for your next job interview.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069',
    readTime: '8 min read',
    category: 'Interviews'
  },
  {
    id: 3,
    title: 'Negotiating Your Salary',
    summary: 'How to confidently negotiate your salary and benefits package.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070',
    readTime: '6 min read',
    category: 'Career Tips'
  },
  {
    id: 4,
    title: 'Remote Work Best Practices',
    summary: 'Stay productive and maintain work-life balance when working remotely.',
    image: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5?q=80&w=2069',
    readTime: '7 min read',
    category: 'Workplace'
  }
];

const Blog = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent">Career Blog</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <div 
            key={post.id}
            className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
          >
            <div className="h-48 bg-gray-200 overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                {post.readTime}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-16" />
            </div>
            <div className="p-6">
              <div className="flex items-center text-xs text-blue-600 font-medium mb-2">
                <BookOpenText className="h-3 w-3 mr-1" />
                {post.category}
              </div>
              <h2 className="text-xl font-medium mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h2>
              <p className="text-gray-600 mb-4">
                {post.summary}
              </p>
              <div className="flex justify-between items-center">
                <Button
                  variant="link"
                  className="px-0 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  Read more <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-all"
                >
                  <Bookmark className="h-4 w-4" />
                  <span className="sr-only">Bookmark</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
