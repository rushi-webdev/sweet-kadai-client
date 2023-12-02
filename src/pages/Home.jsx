import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../slice/userSlice";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import SliderComponent from "../components/SliderComponent";
import SliderTitle from "../components/SliderTitle";
import { useMediaQuery } from "react-responsive";
function Home() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const products = useSelector((state) => state.products.products);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  useEffect(() => {
    const id = secureLocalStorage.getItem("userId");
    dispatch(fetchUserById(id));
  }, [dispatch]);

  const otherCategory = () => {
    return products.filter((product) => {
      return (
        product?.category &&
        product?.category?.name &&
        product?.category?.name?.toLowerCase() === "other"
      );
    });
  };
  if (loading === "idle" || loading === "pending") {
    return (
    <div>
      <p>Loading...</p>
    </div>
    );
  }
  return (
    <div className="w-100">
      <div className={`${isMobile ? "" : "mt-1"}`}>
        <img
          className="w-100"
          src="https://www.sweetkadai.com/modules/labslideshow/images/294ba04102df58c31f254873b07cf8f4de0059d3_Sweetkadai-worldwide.jpg"
          alt=""
        />
      </div>
      <div className="w-100 flex justify-center">
        <div className="w-95 flex mt-1 align-center direction  mb-1">
          <SliderTitle head="New" title="Products" />
          <SliderComponent products={otherCategory()} />
        </div>
      </div>
      <div className="w-100 flex justify-center">
        <div className={`w-90 flex justify-between ${isMobile?"direction":""}`}>
          <img
            style={{ width: isMobile?"100%":"31%",marginTop:isMobile?"0rem":"" }}
            src="https://www.sweetkadai.com/img/cms/100-freshness-sweetkadai.jpg"
            alt=""
          />
          <img
            style={{ width: isMobile?"100%":"31%",marginTop:isMobile?"1rem":"" }}
            src="https://www.sweetkadai.com/img/cms/dispatch-1-day.jpg"
            alt=""
          />
          <img
            style={{ width: isMobile?"100%":"31%",marginTop:isMobile?"1rem":"" }}
            src="https://www.sweetkadai.com/img/cms/tamilnadu-famous-sweets.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
