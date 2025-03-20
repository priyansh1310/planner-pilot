
import React, { useState, useEffect } from 'react';
import Card from '@/components/common/Card';
import { ExternalLink, Youtube, Book, Globe, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

// Mock data function for videos
const getMockVideoData = (topic: string) => {
  const videos = [
    {
      id: '1',
      title: `Understanding ${topic} - Comprehensive Guide`,
      channel: 'LearningMastery',
      views: '1.2M views',
      thumbnail: 'https://placehold.co/320x180/3b82f6/ffffff?text=Video+1',
      duration: '32:15',
      link: '#'
    },
    {
      id: '2',
      title: `Advanced ${topic} Concepts Explained`,
      channel: 'AcademicExcellence',
      views: '856K views',
      thumbnail: 'https://placehold.co/320x180/3b82f6/ffffff?text=Video+2',
      duration: '48:05',
      link: '#'
    },
    {
      id: '3',
      title: `${topic} Made Simple - Quick Tutorial`,
      channel: 'StudyPro',
      views: '1.5M views',
      thumbnail: 'https://placehold.co/320x180/3b82f6/ffffff?text=Video+3',
      duration: '15:42',
      link: '#'
    },
    {
      id: '4',
      title: `${topic} for Beginners - Step by Step`,
      channel: 'EduChannel',
      views: '623K views',
      thumbnail: 'https://placehold.co/320x180/3b82f6/ffffff?text=Video+4',
      duration: '26:18',
      link: '#'
    }
  ];
  
  return videos;
};

// Mock data function for books
const getMockBookData = (topic: string) => {
  const books = [
    {
      id: '1',
      title: `Essential ${topic} Handbook`,
      author: 'Dr. Robert Anderson',
      rating: 4.8,
      year: 2022,
    },
    {
      id: '2',
      title: `${topic}: A Comprehensive Approach`,
      author: 'Emily N. Morgan',
      rating: 4.5,
      year: 2021,
    },
    {
      id: '3',
      title: `Understanding ${topic} - From Theory to Practice`,
      author: 'James P. Smith',
      rating: 4.7,
      year: 2023,
    },
    {
      id: '4',
      title: `Advanced ${topic} Concepts`,
      author: 'David R. Williams',
      rating: 4.6,
      year: 2020,
    },
    {
      id: '5',
      title: `${topic} for Academic Excellence`,
      author: 'Sarah J. Thompson',
      rating: 4.9,
      year: 2023,
    },
    {
      id: '6',
      title: `The Complete Guide to ${topic}`,
      author: 'Michael C. Brown',
      rating: 4.4,
      year: 2021,
    }
  ];
  
  return books;
};

// Mock data function for online resources
const getMockOnlineData = (topic: string) => {
  const resources = [
    {
      id: '1',
      title: `${topic} - Online Course`,
      provider: 'Coursera',
      type: 'Course',
      duration: '8 weeks',
      link: '#'
    },
    {
      id: '2',
      title: `Interactive ${topic} Tutorials`,
      provider: 'Khan Academy',
      type: 'Interactive',
      duration: 'Self-paced',
      link: '#'
    },
    {
      id: '3',
      title: `${topic} - Practice Problems`,
      provider: 'MIT OpenCourseware',
      type: 'Practice',
      duration: 'N/A',
      link: '#'
    },
    {
      id: '4',
      title: `${topic} - Expert Articles`,
      provider: 'ResearchGate',
      type: 'Articles',
      duration: 'N/A',
      link: '#'
    }
  ];
  
  return resources;
};

interface ResourceProps {
  topic: string;
}

export const VideoResource: React.FC<ResourceProps> = ({ topic }) => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setVideos(getMockVideoData(topic));
      setLoading(false);
    }, 1000);
  }, [topic]);
  
  const handleFeedback = (type: 'like' | 'dislike') => {
    toast({
      title: "Feedback received",
      description: type === 'like' ? "We'll show you more content like this." : "We'll improve our recommendations.",
    });
  };
  
  return (
    <div className="mt-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          // Skeleton loading state
          Array(4).fill(0).map((_, index) => (
            <Card key={`skeleton-${index}`} className="flex flex-col p-0 overflow-hidden">
              <Skeleton className="w-full h-40" />
              <div className="p-4 space-y-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-2/3 h-4" />
                <Skeleton className="w-1/2 h-4" />
              </div>
            </Card>
          ))
        ) : (
          videos.map((video) => (
            <Card key={video.id} className="flex flex-col p-0 overflow-hidden" hoverable>
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-40 object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
                <p className="text-muted-foreground text-xs mt-1">{video.channel}</p>
                <p className="text-muted-foreground text-xs">{video.views}</p>
                
                <div className="mt-auto pt-3 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleFeedback('like')}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleFeedback('dislike')}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <a 
                    href={video.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-xs font-medium text-primary hover:underline"
                  >
                    Watch
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export const BookResource: React.FC<ResourceProps> = ({ topic }) => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setBooks(getMockBookData(topic));
      setLoading(false);
    }, 1000);
  }, [topic]);
  
  return (
    <div className="mt-6">
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(6).fill(0).map((_, index) => (
            <Card key={`skeleton-${index}`} className="p-4 space-y-3">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-2/3 h-4" />
              <Skeleton className="w-1/3 h-4" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <Card key={book.id} className="p-4" hoverable>
              <div className="space-y-2">
                <h3 className="font-medium">{book.title}</h3>
                <p className="text-sm text-muted-foreground">by {book.author}</p>
                <div className="flex items-center text-sm">
                  <span className="text-amber-500 mr-1">★</span>
                  <span>{book.rating} • {book.year}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export const OnlineResource: React.FC<ResourceProps> = ({ topic }) => {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setResources(getMockOnlineData(topic));
      setLoading(false);
    }, 1000);
  }, [topic]);
  
  return (
    <div className="mt-6">
      {loading ? (
        <div className="space-y-4">
          {Array(4).fill(0).map((_, index) => (
            <Card key={`skeleton-${index}`} className="p-4">
              <div className="flex justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="w-full h-5" />
                  <Skeleton className="w-1/3 h-4" />
                  <Skeleton className="w-1/2 h-4" />
                </div>
                <Skeleton className="w-20 h-10 rounded-md" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {resources.map((resource) => (
            <Card key={resource.id} className="p-4" hoverable>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">{resource.provider}</span> • {resource.type}
                  </p>
                  {resource.duration !== 'N/A' && (
                    <p className="text-sm text-muted-foreground">Duration: {resource.duration}</p>
                  )}
                </div>
                
                <Button asChild size="sm">
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center"
                  >
                    Access
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
