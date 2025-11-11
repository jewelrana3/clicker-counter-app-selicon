"use client";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function BackButton() {
  return (
    <div
      className="absolute top-2 left-5 flex items-center cursor-pointer"
      onClick={() => history.back()}
    >
      <FaArrowLeftLong />
      <span className="ml-3">Back</span>
    </div>
  );
}
