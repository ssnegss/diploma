import * as React from "react";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
   dataIsUploaded,
   getDataFromCsvDropdown,
   getDataFromTouchDropdown,
   showButtonIsPressed,
} from "../../redux/actions/actionCreator";

export const SelectActionComponent = (props) => {
   const [selectValue, setSelectValue] = React.useState("");
   const dispatch = useDispatch();

   //    Получение выбранной опции

   const handleChange = (event) => {
      setSelectValue(event.target.value);
      dispatch(showButtonIsPressed(false));
      dispatch(dataIsUploaded(false));
   };

   //    Получение значения из выпадающего списка.
   //    Сохранение значения выпадающего списка

   const menuItemClicked = (option) => {
      if (option.className === "getDataFromCsv") {
         dispatch(getDataFromCsvDropdown(option.value));
         dispatch(getDataFromTouchDropdown(undefined));
      }
      if (option.className === "getDataFromTouch") {
         dispatch(getDataFromTouchDropdown(option.value));
         dispatch(getDataFromCsvDropdown(undefined));
      }
   };

   //    Компонент - выпадающий список

   return (
      <>
         <Box sx={{ minWidth: 120 }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
               <InputLabel id="demo-simple-select-standard-label">
                  {props.header}
               </InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectValue}
                  label="Select"
                  onChange={handleChange}
               >
                  {props.options.map((option) => (
                     <MenuItem
                        key={option.id}
                        value={option.value}
                        className={option.className}
                        onClick={(e) => menuItemClicked(option, e)}
                     >
                        {option.name}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Box>
      </>
   );
};
