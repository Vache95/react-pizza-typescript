import { FC } from "react";
import { useEffect } from "react";
import MyLoader from "../components/pizzaBlock/components/skeleton";
import PizzaBlock from "../components/pizzaBlock";
import Sort from "../components/sort";
import Categories from "../components/categories";
import Pagination from "../components/pagination";
import { useSelector } from "react-redux";
import { setCategoryId, seyPageCount, seyFilters } from "../store/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { list } from "../components/sort";
// import { chunk } from "../utils/math";
import { fetchPizzas, selectFilter, selectPizza } from "../store/slices/pizzaSlice";
import { useAppDispatch } from "../store/store";

const Home: FC = () => {
  import("../utils/math").then((math) => {
    console.log(math.chunk(22, 44));
  });

  const categoryId: any = useSelector<any>((state) => state.filter.categoryId);
  const sortType: any = useSelector<any>((state) => state.filter.sort.sortProperty);
  const pageCount: any = useSelector<any>((state) => state.filter.pageCount);
  const { searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickCategory = (id: number): void => {
    dispatch(setCategoryId(id));
  };
  const pagefunction = (count: number): void => {
    dispatch(seyPageCount(count));
  };

  const pizza = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue)) {
        return true;
      }
      return false;
    })
    .map((e: any, i: any) => <PizzaBlock {...e} key={i} />);

  const skeletons = [...new Array(6)].map((_, i) => <MyLoader key={i} />);

  useEffect(() => {
    dispatch(
      fetchPizzas({
        pageCount,
        categoryId,
        sortType,
      })
    );
    window.scrollTo(0, 0);
  }, [sortType, categoryId, pageCount]);

  useEffect(() => {
    const queryString = qs.stringify({
      sortType,
      categoryId,
      pageCount,
    });
    navigate(`?${queryString}`);
  }, [sortType, categoryId, pageCount]);
  useEffect(() => {
    if (window.location.search) {
      const params: unknown = qs.parse(window.location.search.substring(1));
      const sort: unknown = list.find(
        //@ts-ignore
        (obj) => obj.sortProperty === params.sortType
      );
      dispatch(
        //@ts-ignore
        seyFilters({ ...params, sort })
      );
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort />
        </div>
        <h2 className="content__title">?????? ??????????</h2>
        <div className="content__items">{status ? skeletons : pizza}</div>
        <Pagination pageCount={pageCount} onChange={pagefunction} />
      </div>
    </>
  );
};

export default Home;
