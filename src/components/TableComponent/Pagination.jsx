import Button from "@mui/material/Button";

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
            <Button
               variant="contained"
               component="label"
               sx={{ margin: "10px", fontSize: "0.75rem" }}
               className="tablePaginationButton"
               disabled={activePage === 1}
               onClick={() => setActivePage(1)}
            >
               ⏮️ В начало
            </Button>
            <Button
               variant="contained"
               component="label"
               sx={{ margin: "10px", fontSize: "0.75rem" }}
               className="tablePaginationButton"
               disabled={activePage === 1}
               onClick={() => setActivePage(activePage - 1)}
            >
               ⬅️ Назад
            </Button>
            <Button
               variant="contained"
               component="label"
               sx={{ margin: "10px", fontSize: "0.75rem" }}
               className="tablePaginationButton"
               disabled={activePage === totalPages}
               onClick={() => setActivePage(activePage + 1)}
            >
               Вперед ➡️
            </Button>
            <Button
               variant="contained"
               component="label"
               sx={{ margin: "10px", fontSize: "0.75rem" }}
               className="tablePaginationButton"
               disabled={activePage === totalPages}
               onClick={() => setActivePage(totalPages)}
            >
               В конец ⏭️
            </Button>
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
