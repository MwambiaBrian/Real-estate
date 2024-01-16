import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/listing/get/${params.listingId}`
        );

        const data = await res.json();
        if (data.success === false) {
          setError(true);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, []);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong</p>
      )}
      {listing && !error && !loading && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: cover,
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
}

export default Listing;
