import styles from "./PriceComponentStyles.module.css";

export const PriceComponent = ({ data, price }) => {
   return (
      <div className={styles.PriceComponent}>
         <p className={styles.PriceComponent__header}>
            {data.length > 0 ? data[0].name : "Не удалось получить данные"}
         </p>
         <h1>{price.toLocaleString("ru")}</h1>
      </div>
   );
};
