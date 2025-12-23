export const FooterBranding = () => (
  <div className="mt-4 flex flex-col items-center gap-1.5 opacity-20 select-none pointer-events-none">
    <div className="flex items-center gap-2">
      <div className="h-[1px] w-6 bg-foreground/30" />
      <p className="text-[9px] uppercase tracking-[0.25em] font-bold">
        AIPERAS
      </p>
      <div className="h-[1px] w-6 bg-foreground/30" />
    </div>
    <p className="text-[8px] font-medium tracking-wide">
      © {new Date().getFullYear()} ALL RIGHTS RESERVED
    </p>
  </div>
);
