import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <p> Shamim @2023</p>
      </Box>
    </>
  );
}
