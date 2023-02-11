import { Prose } from '@nikolovlazar/chakra-ui-prose';
import createDOMPurify from 'dompurify';
import parse from 'html-react-parser';

import type { HTMLReactParserOptions } from 'html-react-parser';

const DOMPurify = createDOMPurify(window);

export interface HtmlParserProps extends HTMLReactParserOptions {
  html: string;
  className?: string;
}

export const HtmlParser = ({ html = '', className = '', ...props }: HtmlParserProps) => (
  <Prose>
    <div className={`${className}`}>
      {parse(DOMPurify.sanitize(html), {
        trim: false,
        ...props,
      })}
    </div>
  </Prose>
);
