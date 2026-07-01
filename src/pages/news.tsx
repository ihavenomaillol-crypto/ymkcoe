import { AppLayout } from "@/components/layout/AppLayout";
import { getNews } from "@workspace/api-client-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Pin, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollTrigger } from "@/hooks/use-scroll-load";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CATEGORIES = ["All", "announcement", "event", "achievement", "news"];

const PAGE_SIZE = 6;

interface ArticleCardProps {
  item: any;
  size: "large" | "medium" | "small";
  onReadMore: (item: any) => void;
}

function ArticleCard({ item, size, onReadMore }: ArticleCardProps) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Category & Date Header */}
        <div className="flex items-center justify-between mb-4 border-b border-foreground pb-2 text-[10px] font-bold uppercase tracking-widest font-serif text-foreground">
          <span className={`text-[11px] font-black tracking-widest uppercase font-serif text-foreground ${item.category === 'announcement' ? 'group-hover:text-blue-600 transition-colors' : item.category === 'event' ? 'group-hover:text-yellow-600 transition-colors' : item.category === 'achievement' ? 'group-hover:text-amber-600 transition-colors' : ''}`}>
            {item.category}
          </span>
          <div className="flex items-center gap-2">
            {item.isPinned && (
              <span className="flex items-center text-foreground group-hover:text-accent transition-colors font-bold">
                <Pin className="h-3 w-3 mr-1 fill-current" /> PINNED
              </span>
            )}
            <span>
              {new Date(item.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2 
          className={`font-serif font-black text-foreground group-hover:text-accent transition-colors cursor-pointer leading-[0.95] tracking-tighter uppercase mb-4 break-words w-full ${isLarge ? 'text-4xl md:text-6xl lg:text-7xl' : isSmall ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'}`}
          onClick={() => onReadMore(item)}
        >
          {item.title}
        </h2>

        {/* Image */}
        {item.imageUrl && !isSmall && (
          <div className="mb-4">
            <div className={`w-full shrink-0 overflow-hidden border-2 border-foreground bg-muted ${isLarge ? 'h-72 md:h-96 lg:h-[500px]' : 'h-56'}`}>
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-105"
              />
            </div>
            {/* Caption */}
            <p className="text-[10px] text-muted-foreground font-serif italic mt-2 text-center border-b border-border pb-1">
              Fig: {item.title} - Published in YMKCOE Times.
            </p>
          </div>
        )}

        {/* Article Body */}
        <p className={`text-foreground/90 font-serif text-justify leading-relaxed ${isLarge ? 'text-base md:text-lg line-clamp-[10]' : isSmall ? 'text-xs line-clamp-3' : 'text-sm line-clamp-6'}`}>
          {item.content}
        </p>
      </div>

      {/* Footer / Read More */}
      <div className="mt-6 pt-4 border-t border-foreground/20">
        <button
          onClick={() => onReadMore(item)}
          className={`text-foreground hover:text-accent font-black uppercase tracking-[0.2em] font-serif flex items-center gap-1 group/btn border-b-2 border-transparent hover:border-accent transition-all pb-1 ${isSmall ? 'text-[9px]' : 'text-xs'}`}
        >
          <span>Read Full Story</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedNews, setSelectedNews] = useState<any>(null);
  
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["news", selectedCategory],
    queryFn: ({ pageParam = 0 }: any) =>
      getNews({
        category: selectedCategory !== "All" ? selectedCategory : undefined,
        limit: PAGE_SIZE,
        offset: pageParam,
      }),
    getNextPageParam: (lastPage: any, pages: any) =>
      lastPage.length === PAGE_SIZE ? pages.length * PAGE_SIZE : undefined,
    initialPageParam: 0,
  });

  const newsItems = (Array.isArray(data?.pages?.flat()) ? data.pages.flat() : []) as any[];
  const sortedNewsItems = [...newsItems].sort((a, b) => {
    const score = { high: 3, moderate: 2, low: 1 } as Record<string, number>;
    const scoreA = score[a.status as string] || 2;
    const scoreB = score[b.status as string] || 2;
    if (scoreA !== scoreB) {
      return scoreB - scoreA;
    }
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const bottomRef = useScrollTrigger(fetchNextPage, !!hasNextPage, "250px");

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "announcement": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "event": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "achievement": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second to be fully dynamic
    return () => clearInterval(timer);
  }, []);

  const getCardSize = (item: any, isLead: boolean) => {
    if (isLead || item.status === "high") return "large";
    if (item.status === "low") return "small";
    return "medium";
  };

  return (
    <AppLayout>
      <section data-scroll-reveal className="bg-[#fdfbf7] dark:bg-[#121212] text-foreground py-12 md:py-16 border-b-8 border-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 flex justify-between items-center text-foreground font-serif uppercase tracking-widest text-xs md:text-sm border-y-2 border-foreground py-3 max-w-4xl mx-auto font-bold">
            <span>Vol. I</span>
            <span className="hidden md:inline">YMKCOE Updates</span>
            <span>{currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="hidden md:inline">Pune, Maharashtra</span>
            <span>Est. 2026</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black font-serif mb-6 tracking-tighter uppercase leading-[0.8]">YMKCOE TIMES</h1>
          <p className="text-lg md:text-xl text-foreground/80 font-serif italic max-w-2xl mx-auto">
            Your trusted source for the latest happenings, achievements, and upcoming events at Yashoda Mahadeo Kakade College of Engineering.
          </p>
        </div>
      </section>

      <section data-scroll-reveal className="py-4 bg-[#fdfbf7] dark:bg-[#121212] border-b-4 border-foreground sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 overflow-x-auto pb-2 -mb-2">
          <div className="flex gap-8 min-w-max justify-center font-serif">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`uppercase tracking-widest text-sm md:text-base font-black pb-1 border-b-4 transition-all ${selectedCategory === cat ? "border-foreground text-foreground" : "border-transparent text-foreground/60 hover:text-foreground hover:border-foreground/30"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section data-scroll-reveal className="py-16 bg-[#fcfbf9] dark:bg-[#181818] min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-[1400px]">
          {isLoading ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <Skeleton className="h-48 sm:h-auto sm:w-1/3" />
                    <CardContent className="p-6 sm:w-2/3">
                      <Skeleton className="h-4 w-24 mb-4" />
                      <Skeleton className="h-6 w-full mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-6" />
                      <Skeleton className="h-4 w-32" />
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : sortedNewsItems.length > 0 ? (
            (() => {
              const getGridSpans = (item: any) => {
                if (item.status === "high") {
                  return "col-span-12 md:col-span-2 lg:col-span-8";
                }
                return "col-span-12 md:col-span-1 lg:col-span-4";
              };

              return (
                <div className="flex flex-col gap-0 max-w-[1400px] mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 grid-flow-row-dense gap-0 border-t-4 border-l-4 border-foreground bg-[#fdfbf7] dark:bg-[#121212]">
                    {sortedNewsItems.map((item) => {
                      const spans = getGridSpans(item);
                      const size = getCardSize(item, false);
                      return (
                        <div 
                          key={item.id} 
                          className={`${spans} p-6 md:p-8 border-r-4 border-b-4 border-foreground group`}
                        >
                          <ArticleCard item={item} size={size} onReadMore={setSelectedNews} />
                        </div>
                      );
                    })}
                  </div>
                  <div ref={bottomRef} className="h-px w-full mt-4" />
                </div>
              );
            })()
          ) : (
            <div className="text-center py-20 bg-card rounded-xl border border-border max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-primary mb-2">No news items found</h3>
              <p className="text-muted-foreground">Check back later for updates or try a different category.</p>
            </div>
          )}
          {isFetchingNextPage && (
            <div className="mt-8 text-center text-sm text-muted-foreground">Loading more news...</div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedNews} onOpenChange={(open) => !open && setSelectedNews(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <div className="flex flex-col gap-6 pt-2">
              <DialogHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${getCategoryColor(selectedNews.category)} hover:${getCategoryColor(selectedNews.category)} capitalize border-none`}>
                    {selectedNews.category}
                  </Badge>
                  <div className="flex items-center text-sm font-medium text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(selectedNews.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight text-primary">
                  {selectedNews.title}
                </DialogTitle>
              </DialogHeader>
              
              {selectedNews.imageUrl && (
                <div className="w-full bg-muted rounded-xl overflow-hidden shadow-sm">
                  <img src={selectedNews.imageUrl} alt={selectedNews.title} className="w-full h-auto max-h-[400px] object-contain" />
                </div>
              )}
              
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                {selectedNews.content}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
