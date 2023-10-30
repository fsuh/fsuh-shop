const FormInput = ({
	label,
	name,
	type,
	defaultValue,
}: {
	label: string;
	name: string;
	type: string;
	defaultValue?: string;
}) => {
	return (
		<div className="form-control">
			<label className="label">
				<span className="label-text">{label}</span>
			</label>
			<input
				type={type}
				name={name}
				defaultValue={defaultValue}
				className="input input-bordered"
			/>
		</div>
	);
};
export default FormInput;
