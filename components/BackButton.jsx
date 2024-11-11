import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return <button type="back" onClick={()=>navigate(-1)}>&larr; Back</button>;
}
