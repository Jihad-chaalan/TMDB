import { useEffect } from "react";

const TestAPI = () => {
  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzhhYWRkNWJjODA0NjljYTUzZDdkYWFmMTNjZmRiZCIsIm5iZiI6MTczOTY5MzQyMi4zNCwic3ViIjoiNjdiMTlkNmU4NWY1NzZlOTdkNmRiMmMxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.i5b5QkCeIMIgt2zcjcl4qBDem118NypBZ7yEeSal-ss",
      },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => console.log(json))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return <div>Check the console for API data.</div>;
};

export default TestAPI;
