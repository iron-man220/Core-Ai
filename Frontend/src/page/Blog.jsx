import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */
const featuredPost = {
  id: 1,
  tag: 'Product Update',
  title: 'Introducing Core AI Vision: The Future of Multimodal Understanding',
  excerpt: 'Today we are thrilled to announce Vision capabilities across all our models. Upload images, analyze complex charts, and generate visual code instantly.',
  author: 'Core AI Team',
  date: 'Jul 12, 2026',
  readTime: '6 min read',
  imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop',
};

const posts = [
  {
    id: 2,
    tag: 'Research',
    title: 'Reasoning vs. Retrieval: When to use RAG in 2026',
    excerpt: 'As native model context windows grow massive, is Retrieval-Augmented Generation still necessary? We break down the math and latency trade-offs.',
    author: 'Dr. Sarah Chen',
    date: 'Jul 8, 2026',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    tag: 'Tutorial',
    title: 'Building a Secure Enterprise AI Workspace',
    excerpt: 'A step-by-step guide to deploying Core AI Notebooks inside a VPC, ensuring zero data retention and maximum compliance.',
    author: 'Marcus Vance',
    date: 'Jul 2, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    tag: 'Design',
    title: 'Designing Interfaces for Non-Deterministic Systems',
    excerpt: 'How do you design a UI when the output changes every time? Our lead designer shares principles for building trust in generative workflows.',
    author: 'Elena Rodriguez',
    date: 'Jun 28, 2026',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    tag: 'Engineering',
    title: 'Optimizing Inference: How We Cut Latency by 40%',
    excerpt: 'A deep dive into KV cache quantization, speculative decoding, and the infrastructure changes that make our API the fastest on the market.',
    author: 'David Kim',
    date: 'Jun 15, 2026',
    readTime: '12 min read',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
  },
];

const Blog = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImageContainerRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const ctaRef = useRef(null);
  const ctaTextRef = useRef(null);

  useGSAP(() => {
    // ─── Scene 1: Cinematic Pinned Hero ───
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=150%', // Scroll for 150% of viewport height before unpinning
        pin: true,
        scrub: 1, // Smooth scrubbing
      }
    });

    // Fade out text and scale up the image to cover the screen
    heroTl
      .to(heroTextRef.current, { opacity: 0, y: -50, scale: 0.95, duration: 1 })
      .fromTo(heroImageContainerRef.current, 
        { scale: 0.8, y: '20vh', borderRadius: '32px' },
        { scale: 1, y: '0vh', borderRadius: '0px', duration: 2 },
        '-=0.8' // Start slightly before text finishes fading
      );

    // ─── Scene 2: Horizontal Scroll Track ───
    // Calculate total distance to scroll horizontally based on track width
    const getScrollAmount = () => {
      const trackWidth = horizontalTrackRef.current.scrollWidth;
      return -(trackWidth - window.innerWidth + 100); // 100px padding
    };

    gsap.to(horizontalTrackRef.current, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalSectionRef.current,
        start: 'top top',
        end: () => `+=${horizontalTrackRef.current.scrollWidth}`, // Scroll distance equals track width
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculate on resize
      }
    });

    // ─── Scene 3: CTA Scrubbed Text Reveal ───
    // Split the text into words manually or using GSAP SplitText (we'll do manual spans for safety without Club GreenSock)
    const words = ctaTextRef.current.querySelectorAll('.cta-word');
    gsap.fromTo(words, 
      { opacity: 0.1, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 70%',
          end: 'center center',
          scrub: 1,
        }
      }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-x-hidden">
      
      {/* ─── SCENE 1: Pinned Hero ─── */}
      <section ref={heroRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
        <div ref={heroTextRef} className="relative z-10 text-center px-6 max-w-5xl mt-[-10vh]">
          <span className="inline-block px-4 py-1.5 text-sm font-semibold uppercase tracking-widest border border-border/50 rounded-full mb-8 bg-background/50 backdrop-blur-sm">
            Core AI Journal
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-[88px] font-bold tracking-tight leading-[1.05]">
            Stories of <br/> Intelligence & Design
          </h1>
          <p className="mt-8 mb-24 text-xl text-muted-foreground max-w-2xl mx-auto">
            Deep dives into inference optimization, multimodal architecture, and the future of human-AI interaction.
          </p>
        </div>

        {/* Featured Post Card (Acts as the expanding hero image) */}
        <div ref={heroImageContainerRef} className="absolute bottom-0 w-full max-w-6xl h-[60vh] mx-auto overflow-hidden shadow-2xl z-20">
          <Link to="#" className="block w-full h-full relative group">
            <img 
              src={featuredPost.imageUrl} 
              alt="Featured" 
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] group-hover:brightness-100 transition-all duration-700"
            />
            {/* Inner Content overlay for featured post */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-16 text-white">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest bg-white text-black rounded-full mb-4 w-max">
                {featuredPost.tag}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 max-w-3xl">
                {featuredPost.title}
              </h2>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-6 line-clamp-2">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm font-medium opacity-90">
                <span>{featuredPost.author}</span>
                <span>•</span>
                <span>{featuredPost.date}</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── SPACER ─── */}
      {/* Adds natural spacing between the massive hero unpin and the horizontal scroll start */}
      <div className="h-[20vh] w-full bg-background" />

      {/* ─── SCENE 2: Horizontal Scroll Track ─── */}
      <section ref={horizontalSectionRef} className="h-screen w-full flex items-center bg-card/10 overflow-hidden relative border-y border-border/30">
        <div className="absolute top-12 left-12 z-10 hidden md:block">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Latest Articles</h3>
        </div>
        
        <div ref={horizontalTrackRef} className="flex gap-8 px-12 md:px-24 h-[65vh] items-center will-change-transform">
          {posts.map((post) => (
            <Link key={post.id} to="#" className="group relative shrink-0 w-[85vw] md:w-[600px] h-full rounded-[2rem] overflow-hidden bg-card border border-border/50 hover:border-border transition-colors flex flex-col">
              <div className="relative w-full h-[60%] overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-1 bg-card/50 backdrop-blur-sm">
                <div className="mb-auto">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                    {post.tag}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/40 text-sm font-medium text-muted-foreground">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
          {/* End cap spacer to ensure last item is fully visible */}
          <div className="w-[10vw] md:w-[200px] shrink-0 h-full flex items-center justify-center">
             <div className="w-16 h-[1px] bg-border" />
          </div>
        </div>
      </section>

      {/* ─── SCENE 3: Scrubbed Text Reveal CTA ─── */}
      <section ref={ctaRef} className="min-h-[80vh] w-full flex flex-col items-center justify-center px-6 text-center bg-background py-32">
        <div ref={ctaTextRef} className="max-w-4xl flex flex-wrap justify-center gap-x-4 gap-y-2 mb-16">
          {/* Splitting text into individual word spans for the scrub effect */}
          {["The", "future", "of", "intelligence", "is", "being", "built", "right", "now.", "Join", "the", "builders."].map((word, i) => (
            <span key={i} className="cta-word text-4xl md:text-6xl lg:text-[80px] font-bold tracking-tight text-foreground">
              {word}
            </span>
          ))}
        </div>
        
        <Link to="/signup" className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-foreground px-12 font-medium text-background transition-all hover:scale-105 hover:shadow-2xl">
          <span className="relative z-10 flex items-center gap-2 text-lg font-bold">
            Start building for free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-violet-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
        </Link>
      </section>

    </div>
  );
};

export default Blog;
