import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { MetaData } from "./ProductsContainer";
const PaginationContainer = () => {
	const data: MetaData = useLoaderData() as MetaData;
	const meta = data.meta;
	const { pageCount, page } = meta.pagination;

	const pages = Array.from({ length: pageCount }, (_, index) => {
		return index + 1;
	});

	const { search, pathname } = useLocation();
	const navigate = useNavigate();

	const handlePageChange = (pageNumber: number) => {
		const searchParams = new URLSearchParams(search);
		searchParams.set("page", String(pageNumber));
		navigate(`${pathname}?${searchParams.toString()}`);
	};

	if (pageCount < 2) return null;

	return (
		<div className="mt16 flex justify-end">
			<div className="join">
				<button
					className="btn btn-xs sm:btn-md join-item"
					onClick={() => {
						let prevPage = page - 1;
						if (prevPage < 1) prevPage = pageCount;
						handlePageChange(prevPage);
					}}
				>
					Prev
				</button>
				{pages.map((pageNumber) => {
					return (
						<button
							key={pageNumber}
							onClick={() => handlePageChange(pageNumber)}
							className={`btn btn-xs sm:btn-md border-none join-item ${
								pageNumber === page ? "bg-base-300 border-base-300" : ""
							}`}
						>
							{pageNumber}
						</button>
					);
				})}
				<button
					className="btn btn-xs sm:btn-md join-item"
					onClick={() => {
						let nextPage = page + 1;
						if (nextPage > pageCount) nextPage = 1;
						handlePageChange(nextPage);
					}}
				>
					next
				</button>
			</div>
		</div>
	);
};
export default PaginationContainer;
