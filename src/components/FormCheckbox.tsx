import { InputVariables } from "./FormInput";
type FormCheckboxInputvariables = Pick<
	InputVariables,
	"label" | "name" | "size"
> & { defaultChecked: boolean };

const FormCheckbox: React.FC<FormCheckboxInputvariables> = ({
	label,
	name,
	defaultChecked,
	size,
}) => {
	return (
		<div className="form-control items-center">
			<label
				htmlFor={name}
				className="label cursor-pointer"
			>
				<span className="label-text capitalize">{label}</span>
			</label>
			<input
				type="checkbox"
				name={name}
				defaultChecked={defaultChecked}
				className={`checkbox checkbox-primary ${size}`}
			/>
		</div>
	);
};
export default FormCheckbox;
