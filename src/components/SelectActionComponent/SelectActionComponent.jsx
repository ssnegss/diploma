import * as React from "react";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { dataIsUploaded } from "../../redux/actions/actionCreator";
import { getDataFromCsvDropdown } from "../../redux/actions/actionCreator";
import { getDataFromTouchDropdown } from "../../redux/actions/actionCreator";
import { showButtonIsPressed } from "../../redux/actions/actionCreator";

export const SelectActionComponent = (props) => {
   const [selectValue, setSelectValue] = React.useState("");
   const dispatch = useDispatch();

   //    Получение выбранной опции

   const handleChange = (event) => {
      setSelectValue(event.target.value);
      dispatch(showButtonIsPressed(0));
      dispatch(dataIsUploaded(0));
   };

   //    Получение значения из выпадающего списка.
   //    Сохранение значения выпадающего списка

   const menuItemClicked = (option) => {
      if (option.className === "getDataFromCsv") {
         dispatch(getDataFromCsvDropdown(option.value));
      }
      if (option.className === "getDataFromTouch") {
         dispatch(getDataFromTouchDropdown(option.value));
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
