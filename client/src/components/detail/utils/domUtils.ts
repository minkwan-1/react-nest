// utils/domUtils.ts
import { ThemeColors } from "../types";

export const applyCodeBlockStyling = (themeColors: ThemeColors) => {
  document.querySelectorAll("pre code").forEach((block) => {
    if (block && block.parentElement) {
      const parent = block.parentElement;
      parent.style.background = themeColors.code.bg;
      parent.style.border = `2px solid ${themeColors.code.border}`;
      parent.style.borderRadius = "8px";
      parent.style.padding = "16px";
      parent.style.overflow = "auto";
      parent.style.fontSize = "14px";
      parent.style.fontFamily = "monospace";
      parent.style.lineHeight = "1.5";
      parent.style.marginBottom = "16px";
      parent.style.marginTop = "12px";
      parent.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
    }
  });

  document.querySelectorAll("img").forEach((img) => {
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    img.style.borderRadius = "12px";
    img.style.marginTop = "12px";
    img.style.marginBottom = "12px";
    img.style.border = `2px solid ${themeColors.borderLight}`;
    img.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
  });
};
