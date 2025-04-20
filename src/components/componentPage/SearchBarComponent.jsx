import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { searchDataArray } from "../../data/dataForSearchBar";
import "../../styles/Home.css";

export default function SearchBarComponent({setSelectSearch}) {
  return (
   <>
    <Autocomplete

// className="hero-input"
placeholder="Search for algorithms..."
disablePortal
options={searchDataArray}
sx={{
    width: '80%', // full width of container
    // maxWidth: {
    //   xs: '90%',    // on small screens
    //   sm: '80%',
    //   md: '60%',
    //   lg: '40%',
    //   xl: '32em',   // original width on large screens
    // },
    // mx: 'auto', // center horizontally
  }}
onChange={(event, newValue) => {
  // console.log(newValue);
  setSelectSearch(newValue);
}}
renderInput={(params) => 
<TextField
  {...params}
  placeholder="Search for algorithms..."
  className="hero-input"

   sx={{
    '& .MuiOutlinedInput-root': {
      color: 'white', // selected text color
      '& fieldset': {
        borderColor: 'transparent',
      },
      '&:hover fieldset': {
        borderColor: 'transparent',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'transparent',
      },
    },
    '& .MuiInputBase-root': {
      boxShadow: 'none',
    },
    '& input': {
      color: 'white', // input text color
    },
    '& label.Mui-focused': {
      color: 'inherit',
    },
    // 🔽 Change clear (×) and dropdown (▾) icon colors
    '& .MuiAutocomplete-clearIndicator, & .MuiAutocomplete-popupIndicator': {
      color: 'white', // or any color like '#ff5722'
    },
  }}
/>

}

/>
{/* <button className="search-button">Search</button> */}
   </>
  );
}
