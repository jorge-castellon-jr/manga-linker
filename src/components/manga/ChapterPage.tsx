"use client";

import React, { useEffect, useRef } from "react";

interface Props {
  src: string;
  darken: boolean;
  darkenLevel: number;
}

const ChapterPage = ({ src, darken, darkenLevel }: Props) => {
  return (
    <picture>
      <img src={src} alt="" style={{ filter: "url(#whiteToTransparent)" }} />
      {darken && (
        <svg width="0" height="0">
          <defs>
            <filter id="whiteToTransparent">
              <feComponentTransfer>
                <feFuncR type="table" tableValues={`1 .${darkenLevel}`} />
                <feFuncG type="table" tableValues={`1 .${darkenLevel}`} />
                <feFuncB type="table" tableValues={`1 .${darkenLevel}`} />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>
      )}
    </picture>
  );
};

export default ChapterPage;
