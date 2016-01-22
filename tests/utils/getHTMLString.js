import HTML from 'html-parse-stringify';

// WORKAROUND: html-parse-stringify's parser incorrectly parses comment nodes.
const tempReinsertCommentNodes = html=>
  html.replace(/<comment\/>/g, '<!---->');

const tempReplaceCommentNodes = html=>
  html.replace(/<!---->/g, '<comment/>');

export default function(node){
  return tempReinsertCommentNodes(
    HTML.stringify(
      HTML.parse(
        tempReplaceCommentNodes(node.outerHTML)
      )
    )
  );
}
