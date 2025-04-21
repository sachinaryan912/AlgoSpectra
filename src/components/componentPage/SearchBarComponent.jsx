import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { searchDataArray } from "../../data/dataForSearchBar";
import "../../styles/Home.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

const GlassPaper = styled(Paper)(({ theme }) => ({
  background: "transparent",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "26px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
  color: "white",
  marginTop: "8px",
  outline: "none",
  animation: "fadeIn 0.3s ease-out",
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "scale(0.9) translateY(-10px)" },
    to: { opacity: 1, transform: "scale(1) translateY(0)" },
  },
  // Style each dropdown item
  "& .MuiAutocomplete-option": {
    backdropFilter: "blur(10px)",
    padding: "10px 20px",
    borderRadius: "18px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    "&[aria-selected='true']": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    }
  },
}));


export default function SearchBarComponent({ setSelectSearch }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Autocomplete
      disablePortal
      options={searchDataArray}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      open={inputValue.trim().length > 0}
      onChange={(event, newValue) => {
        if (newValue?.path) {
          navigate(newValue.path);
        }
        setSelectSearch(newValue);
      }}
      PaperComponent={(props) => <GlassPaper {...props} />}
      sx={{
        width: "80%",
        margin: "0",
        '& .MuiAutocomplete-inputRoot': {
          background: "transparent",
          borderRadius: "50px",
          padding: "8px 16px",
          color: "white",
          backdropFilter: "blur(20px)",
          outline: "none",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
          transition: "all 0.3s ease-in-out",
          '&:hover': {
            background: "transparent",
          },
          '&.Mui-focused': {
            background: "transparent",
          },
        },
        '& .MuiAutocomplete-popupIndicator': {
          color: "transparent",
        },
        '& .MuiAutocomplete-clearIndicator': {
          color: "transparent",
        },
        '& .MuiInputBase-input': {
          color: "white",
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search here e.g. Arrays, queue etc..."
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
          }}
          InputProps={{
            ...params.InputProps,
            style: {
              fontSize: "1rem",
            },
          }}
        />
      )}
    />
  );
}
