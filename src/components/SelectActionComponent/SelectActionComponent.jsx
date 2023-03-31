import * as React from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { getDataFromDropdown } from "../../redux/actions/actionCreator";

export const SelectActionComponent = (props) => {
   const [age, setAge] = React.useState("");
   const dispatch = useDispatch();

   const handleChange = (event) => {
      setAge(event.target.value);
   };

   const menuItemClicked = (option, e) => {
      if (option.className === "getDataFrom") {
         dispatch(getDataFromDropdown(option.value));
      }
   };

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
                  value={age}
                  label="Age"
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
         {/* <select
            id={props.elementId}
            defaultValue="default"
            onChange={props.onChange}
         >
            <option value="default" disabled hidden>
               {props.header}
            </option>
            {props.options.map((option) => (
               <option key={option.id} value={option.value}>
                  {option.name}
               </option>
            ))}
         </select> */}
      </>
   );
};
