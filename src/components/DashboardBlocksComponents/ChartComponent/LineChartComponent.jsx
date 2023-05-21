export const LineChartComponent = ({ children, name, data }) => {
   return (
      <div className="SessionDashboardComponent__block">
         <h1 className="SessionDashboardComponent__block_header">{name}</h1>
         {data.length > 0 ? (
            Array.isArray(children) ? (
               children
            ) : (
               [children]
            )
         ) : (
            <h1 className="graph__alert_noDataFound">No data found</h1>
         )}
      </div>
   );
};
