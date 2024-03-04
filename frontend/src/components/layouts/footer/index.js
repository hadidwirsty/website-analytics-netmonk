import React from 'react';

export function LayoutFooter() {
  const data = new Date();
  const year = data.getFullYear();

  return (
    <footer className="footer flex items-center">
      <div className="flex-initial text-center md:text-right w-full items-center">
        <div className="text-sm px-10 text-gunmetal-40">
          Powered by&nbsp;
          <a
            href="https://netmonk.id"
            className="hover:text-gunmetal-60 hover:underline"
            title="Netmonk"
            target="_blank"
            rel="noopener noreferrer">
            Netmonk
          </a>
          . &copy;
          {year}. All Right Reserved.
        </div>
      </div>
    </footer>
  );
}

export default LayoutFooter;
