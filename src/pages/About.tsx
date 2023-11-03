const About = () => {
	return (
		<>
			<div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
				<h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
					{" "}
					We Love
				</h1>
				<div className="stats bg-primary shadow">
					<div className="stat">
						<div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
							Alkebulan
						</div>
					</div>
				</div>
			</div>
			<p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
				<span className="text-primary">Alkebulan</span> is known to be the
				oldest name for the continent
				<span className="text-primary"> Africa</span> . From Arabic
				interpretation, it is known as the{" "}
				<span className="text-primary">Land of Blacks</span>. In the{" "}
				<span className="text-primary">History of Afrika</span> by Dr. Cheikh
				Anah Diop, the meaning of{" "}
				<span className="text-primary">Alkebu-lan</span> is translated to mean{" "}
				<span className="text-primary">Mother of mankind</span> or{" "}
				<span className="text-primary">Garden of Eden</span>. The name is
				arguably the first name used by Africans for Africans before the coining
				of the name <span className="text-primary">Africa</span> according to
				several schools of thought. It is the most indigenous name used by the
				first set of Indigenous blacks to represent who they are and where they
				come from before the Romans and ancient Greeks coined and gave the
				continent the new name <span className="text-primary">Africa</span>.
				Although <span className="text-primary">Alkebulan</span> isn’t the only
				name used by the indigenous people to refer to themselves, it was and is
				the most common.
			</p>
		</>
	);
};
export default About;
