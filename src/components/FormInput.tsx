export interface InputVariables {
	label: string;
	name: string;
	type?: string;
	defaultValue?: string;
	size?: string;
	list?: Array<string>;
}
const FormInput: React.FC<InputVariables> = ({
	label,
	name,
	type,
	defaultValue,
	size,
}) => {
	return (
		<div className="form-control">
			<label className="label">
				<span className="label-text capitalize">{label}</span>
			</label>
			<input
				type={type}
				name={name}
				defaultValue={defaultValue}
				className={`input input-bordered ${size}`}
			/>
		</div>
	);
};
export default FormInput;
