import { Link } from "react-router-dom";
import hero1 from "../assets/AfriRoom1.webp";
import hero2 from "../assets/AfriRoom2.webp";
import hero3 from "../assets/AfriRoom3.webp";
import hero4 from "../assets/AfriRoom4.webp";
import hero5 from "../assets/AfriRoom5.webp";

const carouselImages = [hero1, hero2, hero3, hero4, hero5];
const Hero = () => {
	return (
		<div className="grid lg:grid-cols-2 gap-24 items-center">
			<div>
				<h1 className="max-w-2xl text-4l font-bold tracking-tight sm:text-6xl">
					We're changing the paradigm of shopping in Alkebulan
				</h1>
				<p className="mt-8 max-w-xl text-lg leading-8">
					Millions of small, independent shops are the cornerstones of Alkebulan
					commerce. Now they're diversifying, digitizing, and partnering with
					modern retailers to reach the next level.
				</p>
				<div className="mt-10">
					<Link
						to="/products"
						className="btn btn-primary"
					>
						Our Products
					</Link>
				</div>
			</div>
			<div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
				{carouselImages.map((image) => {
					return (
						<div
							key={image}
							className="carousel-item"
						>
							<img
								src={image}
								alt=""
								className="rounded-box h-full w-80 object-cover"
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Hero;
