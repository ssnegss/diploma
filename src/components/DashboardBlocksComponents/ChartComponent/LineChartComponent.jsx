import styles from "./ChartStyles.module.css";

export const LineChartComponent = ({ children, name, data }) => {
   return (
      <div className={styles.lineChart}>
         <h1 className={styles.chartHeader}>{name}</h1>
         {data.length > 0 ? (
            Array.isArray(children) ? (
               children
            ) : (
               [children]
            )
         ) : (
            <h1 className={styles.chart__noDataFound}>No data found</h1>
         )}
      </div>
   );
};
