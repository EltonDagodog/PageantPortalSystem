
import { Award, Crown } from "lucide-react";

interface PageantLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  darkMode?: boolean;
}

const PageantLogo = ({ size = "md", showText = true, darkMode = false }: PageantLogoProps) => {
  const sizes = {
    sm: { icon: 20, text: "text-lg", spacing: "space-x-1" },
    md: { icon: 28, text: "text-xl", spacing: "space-x-2" },
    lg: { icon: 36, text: "text-2xl", spacing: "space-x-3" },
    xl: { icon: 48, text: "text-3xl", spacing: "space-x-4" },
  };

  const currentSize = sizes[size];
  
  return (
    <div className={`flex items-center ${currentSize.spacing}`}>
      <Crown 
        size={currentSize.icon} 
        className="text-pageant-gold animate-crown-shine" 
        strokeWidth={1.5}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-playfair font-bold ${currentSize.text} tracking-wider ${darkMode ? "text-pageant-gold" : "text-pageant-green"}`}>
            PAGEANT
          </span>
          <span className={`font-playfair ${darkMode ? "text-white/80" : "text-black/70"} text-xs tracking-widest`}>
            PARADISE PORTAL
          </span>
        </div>
      )}
    </div>
  );
};

export default PageantLogo;
