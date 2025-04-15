import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4 flex flex-col items-center">
      {/* Lottie Animation */}
      <DotLottieReact
        src="https://lottie.host/9f4257fb-9776-4fb0-9802-68fb1e2552ee/UtkZ84Q6Ix.lottie"
        loop
        autoplay
        style={{ width: 120, height: 120 }}
      />

      {/* TMDB Description */}
      <div className="text-center mt-4 max-w-md text-sm text-gray-400">
        <p>
          This website uses the{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            TMDB API
          </a>{" "}
          to display movie and TV show information, including titles, posters,
          overviews, and ratings.
        </p>

        <p className="mt-2">
          This product is not endorsed or certified by TMDB. All data and images
          belong to their respective owners.
        </p>
      </div>

      {/* Optional Copyright */}
      <p className="text-xs text-gray-600 mt-6">
        © {new Date().getFullYear()} YourWebsiteName. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
