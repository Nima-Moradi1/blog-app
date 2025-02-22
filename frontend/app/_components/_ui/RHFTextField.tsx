import {UseFormRegister, FieldValues} from 'react-hook-form'


interface RHFTextFieldProps {
  type? : string ,
  label : string ,
  name : string ,
  dir?: string ,
  register: UseFormRegister<FieldValues> | any,
  errors?: any
  validationSchema? : Object ,
  isRequired? : boolean
}

export default function RHFTextField({
  type = "text",
  label,
  name,
  dir = "rtl",
  register,
  errors,
  isRequired,
  validationSchema = {},
  ...rest
}:RHFTextFieldProps) {
  const errorMessages = errors?.[name];
  const hasError = !!(errors && errorMessages);
  return (
    <div
      className={`textField relative ${hasError ? "textField--invalid" : ""}`}
    >
      <label htmlFor={name} className="mt-4 mb-2 mr-2 block text-secondary-700">
        {label}
        {isRequired && <span className='text-error'>*</span>}
      </label>
      <input
        autoComplete="off"
        type={type}
        id={name}
        dir={dir}
        className={`textField__input  ${
          dir === "ltr" ? "text-left" : "text-right"
        }`}
        {...register(name, validationSchema)}
        {...rest}
      />
      {errors && errors[name] && (
        <span className="text-red-600 block text-xs mt-2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}
