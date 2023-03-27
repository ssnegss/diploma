export const Pagination = ({
   activePage,
   count,
   rowsPerPage,
   totalPages,
   setActivePage,
}) => {
   const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
   const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;

   return (
      <>
         <div className="pagination">
            <button
               className="tablePaginationButton"
               disabled={activePage === 1}
               onClick={() => setActivePage(1)}
            >
               ⏮️ В начало
            </button>
            <button
               className="tablePaginationButton"
               disabled={activePage === 1}
               onClick={() => setActivePage(activePage - 1)}
            >
               ⬅️ Назад
            </button>
            <button
               className="tablePaginationButton"
               disabled={activePage === totalPages}
               onClick={() => setActivePage(activePage + 1)}
            >
               Вперед ➡️
            </button>
            <button
               className="tablePaginationButton"
               disabled={activePage === totalPages}
               onClick={() => setActivePage(totalPages)}
            >
               В конец ⏭️
            </button>
         </div>
         <p>
            Страница {activePage} из {totalPages}
         </p>
         <p>
            Строки: {beginning === end ? end : `${beginning} - ${end}`} из{" "}
            {count}
         </p>
      </>
   );
};
