import './PriceComponent.css'

export const PriceComponent = ({ data, price }) => {
   return (
      <div className="PriceComponent">
         <p className="PriceComponent__header">
            {data.length > 0 ? data[0].name : "Не удалось получить данные"}
         </p>
         <h1>{price.toLocaleString("ru")}</h1>
      </div>
   );
};
