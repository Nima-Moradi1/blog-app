import { ChangeEventHandler } from "react"

interface textFieldProps {
    type : string ,
    label : string ,
    name : string ,
    value : string | number ,
    dir? : string 
    onChange : React.ChangeEventHandler<HTMLInputElement>,
    isRequired? : boolean ,
    className? : string
    id? : string
}


const TextField = ({
    type = 'text',
    label ,
    name ,
    value , 
    dir = 'rtl' ,
    onChange ,
    isRequired, 
    className,
    id
}:textFieldProps) => {
  return (
    <div className="textField">
        <label htmlFor={name} className="mt-3 block text-secondary-700">
            {label}
            {isRequired && <span className="text-error">*</span>}
        </label>
        <input 
        type={type} name={name} id={name} dir={dir} value={value} onChange={onChange}
        className={` textField__input ${dir === 'ltr' ? 'text-left' : 'text-right' } ${className} ` }
        />
    </div>
  )
}

export default TextField