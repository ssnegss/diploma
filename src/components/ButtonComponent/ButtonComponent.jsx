import "./ButtonComponent.css";

export const ButtonComponent = (props) => {
   return (
      <button className="ButtonComponent" onClick={props.onClick}>
         {props.name}
      </button>
   );
};
