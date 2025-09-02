"use client";
import { useEffect, useState, useRef } from "react";
import Container from "@/components/global/Container";
import "./TemplateDetails.css";
import TemplateDetailsHero from "@/components/pages/Home/TemlateDetailsHero";
import { useGetTemplateBySlugQuery } from "@/redux/api/templateApi";

const TemplateDetails = ({ title }: { title: string }) => {
  const {
    data: data,
    isLoading,
    isError,
    refetch,
  } = useGetTemplateBySlugQuery(title);

  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [processedHTML, setProcessedHTML] = useState<string>("");
  const [titles, setTitles] = useState<string[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (data?.template_data) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.template_data, "text/html");
      const h2Elements = doc.querySelectorAll("h2");
      const newTitles: string[] = [];

      h2Elements.forEach((h2, idx) => {
        h2.setAttribute("id", `heading-${idx}`);
        newTitles.push(h2.textContent || `Title ${idx + 1}`);
      });
      setTitles(newTitles);
      setProcessedHTML(doc.body.innerHTML);
    }
  }, [data]);

  useEffect(() => {
    const headings = contentRef.current?.querySelectorAll("h2");
    if (!headings) return;

    const options = {
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      let lastVisibleHeading: string | null = null;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lastVisibleHeading = entry.target.id;
        }
      });

      if (lastVisibleHeading && activeTitle !== lastVisibleHeading) {
        setActiveTitle(lastVisibleHeading);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);

    headings.forEach((heading) => {
      observerRef.current?.observe(heading);
    });

    return () => {
      headings.forEach((heading) => {
        observerRef.current?.unobserve(heading);
      });
    };
  }, [processedHTML, activeTitle]);

  const handleTitleClick = (id: string) => {
    setActiveTitle(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    return (
      <div className="text-center h-screen w-full flex flex-col items-center justify-center text-xl font-medium text-red-500 font-outfit">
        <p>Something went wrong while fetching the template details.</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className=" min-h-screen">
      <div className="py-8 md:py-14">
        {data?.thumbnail_url && (
          <Container>
            <TemplateDetailsHero data={data} />
          </Container>
        )}

        <Container className="flex flex-col md:flex-row gap-8 lg:gap-16 mt-10">
          <div className="bg-glass-dark backdrop-blur-lg rounded-2xl p-6 md:max-w-xs lg:w-80 md:sticky top-28 h-fit border  shadow-lg">
            <h3 className="font-outfit text-white text-xl font-bold mb-4 flex items-center">
              <span className="mr-2">📋</span> Table of Contents
            </h3>
            <ul className="space-y-3">
              {titles.map((item, idx) => (
                <li
                  key={idx}
                  className={`cursor-pointer transition-all duration-300 py-2 px-3 rounded-lg ${
                    activeTitle === `heading-${idx}`
                      ? "bg-white/5 text-white border-l-4 border-primary"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => handleTitleClick(`heading-${idx}`)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={contentRef}
            className="flex-1 bg-glass-dark backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-lg"
          >
            <div
              className="prose prose-invert max-w-none blog-details font-outfit"
              dangerouslySetInnerHTML={{ __html: processedHTML }}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TemplateDetails;
