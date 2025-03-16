
import React, { useState } from 'react';
import { Book, BookOpenText, Bookmark, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const blogPosts = [
  {
    id: 1,
    title: 'Resume Writing Tips',
    summary: 'Learn how to create a resume that stands out to potential employers.',
    image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=2070',
    readTime: '5 min read',
    category: 'Career Tips',
    fullContent: `
      <h3>How to Create a Standout Resume</h3>
      <p>Your resume is often your first impression with potential employers. Here are some essential tips:</p>
      <ul>
        <li><strong>Tailor your resume for each job:</strong> Customize your resume to highlight relevant skills and experiences for each position.</li>
        <li><strong>Use action verbs:</strong> Begin bullet points with strong action verbs like "achieved," "implemented," or "managed."</li>
        <li><strong>Quantify achievements:</strong> Include specific numbers and metrics to demonstrate your impact.</li>
        <li><strong>Focus on relevant experience:</strong> Prioritize information that directly relates to the job you're applying for.</li>
        <li><strong>Keep it concise:</strong> Limit your resume to 1-2 pages, focusing on the most recent and relevant experiences.</li>
        <li><strong>Include keywords:</strong> Many companies use ATS systems to filter resumes, so include industry-specific keywords.</li>
        <li><strong>Proofread carefully:</strong> Errors can immediately disqualify you, so check for spelling and grammar issues.</li>
      </ul>
      <p>A well-crafted resume can significantly increase your chances of landing an interview and ultimately securing your dream job.</p>
    `
  },
  {
    id: 2,
    title: 'Interview Preparation',
    summary: 'Tips and tricks to help you prepare for your next job interview.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069',
    readTime: '8 min read',
    category: 'Interviews',
    fullContent: `
      <h3>Ace Your Next Job Interview</h3>
      <p>Preparation is key to interview success. Here's how to prepare effectively:</p>
      <ul>
        <li><strong>Research the company:</strong> Understand the company's mission, values, products, and recent news.</li>
        <li><strong>Practice common questions:</strong> Prepare answers for frequently asked interview questions.</li>
        <li><strong>Prepare your own questions:</strong> Have thoughtful questions ready to ask the interviewer.</li>
        <li><strong>Use the STAR method:</strong> Structure your answers with Situation, Task, Action, and Result.</li>
        <li><strong>Dress appropriately:</strong> Research the company culture and dress one level above what employees typically wear.</li>
        <li><strong>Practice body language:</strong> Maintain good posture, eye contact, and a confident handshake.</li>
        <li><strong>Follow up:</strong> Send a thank-you email within 24 hours of your interview.</li>
      </ul>
      <p>Remember that interviews are a two-way street – you're also evaluating if the company is a good fit for you.</p>
    `
  },
  {
    id: 3,
    title: 'Negotiating Your Salary',
    summary: 'How to confidently negotiate your salary and benefits package.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070',
    readTime: '6 min read',
    category: 'Career Tips',
    fullContent: `
      <h3>Strategies for Successful Salary Negotiation</h3>
      <p>Negotiating your salary can significantly impact your financial future. Here's how to do it effectively:</p>
      <ul>
        <li><strong>Research market rates:</strong> Know the typical salary range for your position, experience level, and location.</li>
        <li><strong>Consider the full package:</strong> Evaluate benefits, bonuses, stock options, and work flexibility, not just base salary.</li>
        <li><strong>Let them make the first offer:</strong> If possible, avoid sharing your salary expectations first.</li>
        <li><strong>Use a range:</strong> When discussing numbers, provide a range based on your research.</li>
        <li><strong>Practice your pitch:</strong> Rehearse explaining your value and why you deserve the compensation.</li>
        <li><strong>Remain professional:</strong> Stay positive and collaborative, not confrontational.</li>
        <li><strong>Get it in writing:</strong> Once you reach an agreement, request the complete offer in writing.</li>
      </ul>
      <p>Remember that negotiation is a normal part of the hiring process, and most employers expect it.</p>
    `
  },
  {
    id: 4,
    title: 'Remote Work Best Practices',
    summary: 'Stay productive and maintain work-life balance when working remotely.',
    image: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5?q=80&w=2069',
    readTime: '7 min read',
    category: 'Workplace',
    fullContent: `
      <h3>Thriving in a Remote Work Environment</h3>
      <p>Remote work offers flexibility but comes with unique challenges. Here are best practices to help you succeed:</p>
      <ul>
        <li><strong>Establish a dedicated workspace:</strong> Create a comfortable, distraction-free area specifically for work.</li>
        <li><strong>Maintain a routine:</strong> Set consistent working hours and stick to a schedule.</li>
        <li><strong>Set clear boundaries:</strong> Communicate your working hours to household members and colleagues.</li>
        <li><strong>Take regular breaks:</strong> Follow the 52/17 rule – 52 minutes of work followed by 17 minutes of rest.</li>
        <li><strong>Overcommunicate:</strong> Be more deliberate about sharing updates and asking questions with your team.</li>
        <li><strong>Use the right tools:</strong> Leverage video conferencing, project management, and communication tools.</li>
        <li><strong>Prioritize self-care:</strong> Exercise, eat well, and disconnect completely after work hours.</li>
      </ul>
      <p>With the right approach, remote work can enhance both your productivity and quality of life.</p>
    `
  }
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleReadMore = (post: typeof blogPosts[0]) => {
    setSelectedPost(post);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent">Career Blog</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <div 
            key={post.id}
            className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group hover:bg-blue-50"
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
                  className="px-0 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 hover:scale-105 transition-transform"
                  onClick={() => handleReadMore(post)}
                >
                  Read more <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-all hover:scale-110"
                >
                  <Bookmark className="h-4 w-4" />
                  <span className="sr-only">Bookmark</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog for full blog post content */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-600">
              {selectedPost?.title}
            </DialogTitle>
            <DialogDescription className="flex items-center text-sm">
              <BookOpenText className="h-3 w-3 mr-1" />
              {selectedPost?.category} · {selectedPost?.readTime}
            </DialogDescription>
          </DialogHeader>

          {selectedPost && (
            <div className="mt-4">
              <div className="h-48 bg-gray-200 overflow-hidden rounded-md mb-6">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost.fullContent }}
              />
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <DialogClose asChild>
              <Button variant="outline" className="hover:bg-blue-50 hover:text-blue-600">
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blog;
