import React from "react";

export default function Footer({ footerText = "" }: { footerText?: string }) {
  return (
    <footer className="bg-gradient-to-r from-darkRed1 to-darkRed2 text-white min-h-40  overflow-x-hidden flex flex-col items-center justify-end">
      <div className="font-light tracking-widest">{footerText}</div>
    </footer>
  );
}
