import { useFormStatus } from "react-dom";
import Button from "./Button";
import SvgComponent from "./SvgComponent";
import { MouseEventHandler } from "react";


interface SubmitButtonProps 
  {
    children:React.ReactNode ,
    className? : string , 
    type? :string, 
    disabled? : boolean ,
    variant? : 'danger' | 'outline' | 'primary'
    onClick? : MouseEventHandler<HTMLButtonElement>
  }


export default function  SubmitButton({ children, onClick, className, disabled, variant, type = 'submit' , ...props }:SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      disabled={pending}
      onClick={onClick}
      className={`flex items-center justify-center gap-x-4 py-4
        ${className} 
        `}
    >
      {children}
      {pending && <SvgComponent />}
    </Button>
  );
}
