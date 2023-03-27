import React from "react";

const SortableTable = (items, config = null) => {
   const [sortConfig, setSortConfig] = React.useState(config);

   const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
         sortableItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
               return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
               return sortConfig.direction === "ascending" ? 1 : -1;
            }
            return 0;
         });
      }
      return sortableItems;
   }, [items, sortConfig]);

   const requestSort = (key) => {
      let direction = "ascending";
      if (
         sortConfig &&
         sortConfig.key === key &&
         sortConfig.direction === "ascending"
      ) {
         direction = "descending";
      }
      setSortConfig({ key, direction });
   };

   return { items: sortedItems, requestSort, sortConfig };
};

export const ProductTable = (props) => {
   const { items, requestSort, sortConfig } = SortableTable(props.products);
   const getClassNamesFor = (name) => {
      if (!sortConfig) {
         return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
   };

   const tableHead = Object.keys(items[0] || {});
   return (
      <table>
         <caption>Products</caption>
         <thead>
            <tr>
               {tableHead.map((item) => (
                  <th>
                     <button type="button" onClick={() => requestSort(item)}>
                        {item}
                     </button>
                  </th>
               ))}
            </tr>
         </thead>
         <tbody>
            {items.map((item) => (
               <tr key={item.id}>
                  {Object.keys(item).map((field) => (
                     <td>{item[field]}</td>
                  ))}
               </tr>
            ))}
         </tbody>
      </table>
   );
};
