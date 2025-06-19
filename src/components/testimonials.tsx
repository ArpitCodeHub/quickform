
"use client";
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Star } from 'lucide-react'; // Optional for ratings

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
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
    <section className="py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-10 lg:mb-16 font-headline">
          Loved by Professionals & Students Alike
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card rounded-xl overflow-hidden">
              <CardHeader className="pb-4 pt-6">
                <div className="flex items-center space-x-4 px-6">
                  <Avatar className="h-14 w-14 border-2 border-primary/50">
                    <AvatarImage src={testimonial.avatarUrl} alt={testimonial.author} data-ai-hint={testimonial.avatarHint} />
                    <AvatarFallback className="text-lg">{testimonial.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">{testimonial.author}</CardTitle>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <blockquote className="text-base leading-relaxed text-foreground/90 border-l-4 border-primary/70 pl-4 italic">
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
