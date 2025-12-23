import { cn } from "@/lib/utils";
import { IconButtonProps } from "../types/chat";

export const IconButton = ({ 
  icon: Icon, 
  variant = 'default', 
  className, 
  iconColor,
  ...props 
}: IconButtonProps) => {
  const variants = {
    default: "text-foreground/40 hover:bg-white/5",
    danger: "hover:bg-red-500/10 hover:text-red-500 text-foreground/40",
    accent: "bg-accent text-white shadow-lg shadow-accent/30 hover:shadow-accent/40 hover:-translate-y-0.5"
  };

  return (
    <button 
      className={cn(
        "p-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      <Icon className="w-5 h-5 transition-colors" color={iconColor} />
    </button>
  );
};
