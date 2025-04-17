import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      {/* Lottie Animation */}
      <div>
        <DotLottieReact
          src="https://lottie.host/9f4257fb-9776-4fb0-9802-68fb1e2552ee/UtkZ84Q6Ix.lottie"
          loop
          autoplay
          style={{ width: 120, height: 120 }}
        />
      </div>

      {/* TMDB Description */}
      <div className="text-center mt-4 max-w-md text-sm text-gray-400">
        <h4>Thank you for visiting TMDB</h4>
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
        <p className="text-xs text-gray-600 mt-6">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
