import styles from "./ChartStyles.module.css";
import "./PieGraph.css";

export const PieChartComponent = ({ children, name, data }) => {
   return (
      <div className={styles.pieChart}>
         <h1 className={styles.chartHeader}>{name}</h1>

         {data !== 0 ? (
            <div className={styles.pieChart__container}>
               {Array.isArray(children) ? children : [children]}
            </div>
         ) : (
            <h1 className={styles.chart__noDataFound}>No data found</h1>
         )}
      </div>
   );
};
