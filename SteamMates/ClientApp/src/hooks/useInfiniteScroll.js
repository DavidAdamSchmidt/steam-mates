import { useEffect, useState } from "react";

const useInfiniteScroll = (shouldLoad, callback) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = f => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        !isLoading &&
        shouldLoad
      ) {
        setIsLoading(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, shouldLoad]);

  useEffect(() => {
    if (isLoading) {
      callback();
    }
  }, [isLoading, callback]);

  return [isLoading, setIsLoading];
};

export default useInfiniteScroll;
