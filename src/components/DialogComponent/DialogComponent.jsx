import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { dialogWindowOpened } from "../../redux/actions/actionCreator";

import MaterialReactTable from "material-react-table";
import { MRT_Localization_RU } from "../TableComponent/_locales/ru.ts";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
   "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
   },
   "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
   },
}));

function BootstrapDialogTitle(props) {
   const { children, onClose, ...other } = props;

   return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
         {children}
         {onClose ? (
            <IconButton
               aria-label="close"
               onClick={onClose}
               sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
               }}
            >
               <CloseIcon />
            </IconButton>
         ) : null}
      </DialogTitle>
   );
}

BootstrapDialogTitle.propTypes = {
   children: PropTypes.node,
   onClose: PropTypes.func.isRequired,
};

export const DialogComponent = ({ chartData }) => {
   //    Получение данных из таблицы для отображения в диалоговом окне
   const csvdataWithFilters = useSelector(
      (store) => store?.dataReducer?.filteredCsvData
   );

   const dialogOpened = useSelector(
      (store) => store?.booleanReducer?.dialogIsOpened
   );
   const dispatch = useDispatch();

   const handleClickOpen = () => {
      dispatch(dialogWindowOpened(true));
   };

   const handleClose = () => {
      dispatch(dialogWindowOpened(false));
   };

   //    Формирование заголовка таблицы для диалогового окна

   const tableHeadArray = Object.keys(csvdataWithFilters[0] || {}).map(
      (item) => {
         return item;
      }
   );
   const tableHead = tableHeadArray.map((name) => {
      return {
         header: name,
         accessorKey: name,
      };
   });

   return (
      <div>
         <Button variant="outlined" onClick={handleClickOpen}>
            Open dialog
         </Button>
         <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={dialogOpened}
         >
            <BootstrapDialogTitle
               id="customized-dialog-title"
               onClose={handleClose}
            >
               Подробности
            </BootstrapDialogTitle>
            <DialogContent dividers>
               <MaterialReactTable
                  columns={tableHead}
                  data={chartData}
                  localization={MRT_Localization_RU}
               />
            </DialogContent>
         </BootstrapDialog>
      </div>
   );
};
