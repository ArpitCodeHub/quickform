
"use client";
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Star } from 'lucide-react'; // Optional for ratings

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  // avatarUrl and avatarFallback are no longer used visually but kept in data structure
  avatarUrl: string; 
  avatarFallback: string;
  avatarHint: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: '1',
    quote: "QuickForm has completely changed the way I create professional documents. It's intuitive, fast, and the results are stunning!",
    author: 'Sarah M.',
    role: 'Marketing Manager',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarFallback: 'SM',
    avatarHint: 'woman smiling',
  },
  {
    id: '2',
    quote: "As a student, crafting a standout resume was daunting. QuickForm made it easy and even enjoyable. Highly recommended!",
    author: 'David K.',
    role: 'University Student',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarFallback: 'DK',
    avatarHint: 'man portrait',
  },
  {
    id: '3',
    quote: "The variety of templates and the live preview feature are game-changers. I landed my dream job thanks to the professional resume I built with QuickForm.",
    author: 'Jessica P.',
    role: 'Software Engineer',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarFallback: 'JP',
    avatarHint: 'person professional',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-8 lg:mb-12 font-headline">
          Loved by Professionals & Students Alike
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonialsData.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card rounded-xl overflow-hidden">
              <CardHeader className="pb-3 pt-5 px-5 sm:pb-4 sm:pt-6 sm:px-6">
                {/* Removed Avatar component */}
                <div>
                  <CardTitle className="text-md sm:text-lg font-semibold text-foreground">{testimonial.author}</CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
                <blockquote className="text-sm sm:text-base leading-relaxed text-foreground/90 border-l-4 border-primary/70 pl-3 sm:pl-4 italic">
                  {testimonial.quote}
                </blockquote>
                {/* Optional: Add stars for rating */}
                {/* <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
