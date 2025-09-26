// src/components/common/ErrorDisplay.js

import React from "react";

const ErrorDisplay = ({ message }) => (
  <div className="text-center py-20 bg-red-50 text-red-700 rounded-lg">
    <p className="font-semibold text-lg">{message}</p>
  </div>
);

export default ErrorDisplay;