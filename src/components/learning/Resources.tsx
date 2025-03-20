
import React from 'react';
import Card from '../common/Card';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Star, Bookmark, Clock, ExternalLink, Award } from 'lucide-react';

interface ResourceProps {
  topic: string;
}

// Video resource component
export const VideoResource: React.FC<ResourceProps> = ({ topic }) => {
  // Mock data - in a real app, this would come from an API
  const videos = [
    {
      id: 'v1',
      title: `Introduction to ${topic}`,
      thumbnailUrl: 'https://placehold.co/600x400/10b981/white?text=Video+Thumbnail',
      channelName: 'Learn With Expert',
      duration: '15:42',
      rating: 4.8,
      views: '156K',
      url: '#'
    },
    {
      id: 'v2',
      title: `${topic} Advanced Concepts`,
      thumbnailUrl: 'https://placehold.co/600x400/3b82f6/white?text=Video+Thumbnail',
      channelName: 'Master Class',
      duration: '22:15',
      rating: 4.6,
      views: '98K',
      url: '#'
    },
    {
      id: 'v3',
      title: `${topic} Problem Solving`,
      thumbnailUrl: 'https://placehold.co/600x400/8b5cf6/white?text=Video+Thumbnail',
      channelName: 'Exam Prep',
      duration: '18:30',
      rating: 4.9,
      views: '122K',
      url: '#'
    },
    {
      id: 'v4',
      title: `${topic} Quick Review`,
      thumbnailUrl: 'https://placehold.co/600x400/ec4899/white?text=Video+Thumbnail',
      channelName: 'Top Educator',
      duration: '12:05',
      rating: 4.7,
      views: '78K',
      url: '#'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden" hoverable>
          <div className="relative">
            <AspectRatio ratio={16 / 9}>
              <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                className="object-cover w-full h-full rounded-t-lg"
              />
            </AspectRatio>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-medium line-clamp-2">{video.title}</h3>
            <p className="text-sm text-muted-foreground">{video.channelName}</p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span>{video.rating}</span>
                <span className="text-muted-foreground">({video.views} views)</span>
              </div>
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="px-4 pb-4">
            <Button className="w-full" variant="outline">
              Watch Now
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

// Book resource component
export const BookResource: React.FC<ResourceProps> = ({ topic }) => {
  // Mock data
  const books = [
    {
      id: 'b1',
      title: `Complete Guide to ${topic}`,
      coverUrl: 'https://placehold.co/300x450/10b981/white?text=Book+Cover',
      author: 'Dr. Robert Johnson',
      rating: 4.7,
      pages: 342,
      level: 'Beginner to Advanced',
      url: '#'
    },
    {
      id: 'b2',
      title: `${topic} for Advanced Learners`,
      coverUrl: 'https://placehold.co/300x450/3b82f6/white?text=Book+Cover',
      author: 'Prof. Sarah Williams',
      rating: 4.9,
      pages: 512,
      level: 'Advanced',
      url: '#'
    },
    {
      id: 'b3',
      title: `Mastering ${topic}`,
      coverUrl: 'https://placehold.co/300x450/8b5cf6/white?text=Book+Cover',
      author: 'Daniel Lee, PhD',
      rating: 4.6,
      pages: 276,
      level: 'Intermediate',
      url: '#'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {books.map((book) => (
        <Card key={book.id} className="flex flex-col overflow-hidden" hoverable>
          <div className="p-6 flex justify-center bg-muted/30">
            <img 
              src={book.coverUrl} 
              alt={book.title} 
              className="h-64 object-cover rounded-md shadow-lg"
            />
          </div>
          <div className="p-4 space-y-2 flex-1">
            <h3 className="font-medium">{book.title}</h3>
            <p className="text-sm text-muted-foreground">By {book.author}</p>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="text-sm">{book.rating}</span>
            </div>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                {book.level}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {book.pages} pages
              </span>
            </div>
          </div>
          <div className="px-4 pb-4 mt-auto">
            <Button className="w-full">
              View Book Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

// Online resource component
export const OnlineResource: React.FC<ResourceProps> = ({ topic }) => {
  // Mock data
  const resources = [
    {
      id: 'r1',
      title: `${topic} Interactive Course`,
      provider: 'eduX Learning',
      description: `A comprehensive interactive course covering all aspects of ${topic}. Perfect for JEE/NEET preparation.`,
      difficulty: 'Intermediate',
      duration: '4 weeks',
      free: false,
      url: '#'
    },
    {
      id: 'r2',
      title: `${topic} Practice Problems`,
      provider: 'Practice Hub',
      description: `Over 500 practice problems on ${topic} with detailed solutions and explanations.`,
      difficulty: 'All Levels',
      duration: 'Self-paced',
      free: true,
      url: '#'
    },
    {
      id: 'r3',
      title: `${topic} Crash Course`,
      provider: 'Exam Prep Academy',
      description: `A focused crash course designed specifically for competitive exams covering ${topic}.`,
      difficulty: 'Advanced',
      duration: '2 weeks',
      free: false,
      url: '#'
    }
  ];

  return (
    <div className="space-y-4 mt-4">
      {resources.map((resource) => (
        <Card key={resource.id} className="p-6" hoverable>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium">{resource.title}</h3>
                {resource.free && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900/30 dark:text-green-300">
                    Free
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-primary">{resource.provider}</p>
              <p className="text-sm text-muted-foreground">{resource.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center text-muted-foreground">
                  <Award className="h-4 w-4 mr-1" />
                  {resource.difficulty}
                </span>
                <span className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {resource.duration}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:text-right md:min-w-[150px]">
              <Button>
                Access Resource
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">
                Save for Later
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
