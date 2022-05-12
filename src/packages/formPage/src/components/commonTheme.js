export const btnTheme = (formData) => {
  if (formData.theme_setting === "normal") {
    return {
      borderRadius: "4px",
      borderWidth: "1px",
      borderColor: formData.advance_attribute.input.style.borderColor,
    };
  } else if (formData.theme_setting === "line") {
    return {
      borderRadius: "4px",
      borderWidth: "1px",
      borderColor: formData.advance_attribute.input.style.borderColor,
    };
  } else {
    return {
      borderRadius: "20px",
      borderWidth: "1px",
      borderColor: formData.advance_attribute.input.style.borderColor,
    };
  }
};
