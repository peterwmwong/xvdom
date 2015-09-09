import HTML from 'html-parse-stringify';

export default function(node){
  return HTML.stringify(HTML.parse(node.outerHTML));
}
