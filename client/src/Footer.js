import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Box className="footer-container">
        <p> Shamim @2024</p>
      </Box>
    </>
  );
}
