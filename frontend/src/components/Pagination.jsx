import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../app/currentPageSlice";
import { HashLink } from "react-router-hash-link";

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage.value);
  var offset = currentPage == 3 ? 8 * currentPage : 6 * currentPage;
  var limit = currentPage == 3 ? 10 * currentPage : 12 * currentPage;
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{currentPage == 1 ? 1 : offset}</span>{" "}
            to{" "}
            <span className="font-medium">{currentPage == 1 ? 12 : limit}</span>{" "}
            of <span className="font-medium">30</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            <HashLink
              to="/#app"
              aria-current="page"
              onClick={() => {
                dispatch(setCurrentPage(1));
              }}
              className={
                currentPage == 1
                  ? "rounded-l-md z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  : "rounded-l-md bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              }
            >
              1
            </HashLink>
            <HashLink
              to="/page/2#app"
              className={
                currentPage == 2
                  ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              }
              onClick={() => {
                dispatch(setCurrentPage(2));
              }}
            >
              2
            </HashLink>
            <HashLink
              to="/page/3#app"
              className={
                currentPage == 3
                  ? "rounded-r-md z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  : "rounded-r-md bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              }
              onClick={() => {
                dispatch(setCurrentPage(3));
              }}
            >
              3
            </HashLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
