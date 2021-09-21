// vim:fdm=marker
const fs = require("fs");

// tokenize {{{

function tokenize(data) {
  const tokens = [];
  let stream = data;

  while (stream.length > 0) {
    const endTag = stream.indexOf(">");
    const startTag = stream.indexOf("<");

    if (startTag < 0 || endTag < 0) break;

    // text token
    if (startTag != 0) {
      const text = stream.substring(0, startTag);
      if (text != " ") {
        tokens.push(text);
      }
    }

    tokens.push(stream.substring(startTag, endTag + 1));

    stream = stream.substring(endTag + 1);
  }

  return tokens;
}

// }}}

// createAST {{{

function createAST(tokens) {
  const createNode = () => {
    const token = tokens.shift();

    shouldLookForChildren = true;

    const startTag = token.indexOf("<");
    let endTag = token.indexOf(">");
    const endAltTag = token.indexOf("/>");

    if (endAltTag >= 0) {
      shouldLookForChildren = false;
      endTag = endTag - 1;
    }

    // if text tag, return
    if (startTag < 0 || endTag < 0) {
      return token;
    }

    let name = "";
    let attrs = "";
    let children = [];

    // if attrs exist
    const space = token.indexOf(" ");
    if (space >= 0) {
      name = token.substring(startTag + 1, space);
      attrs = token.substring(space + 1, endTag);
    } else {
      name = token.substring(startTag + 1, endTag);
    }

    const parentEndTag = `</${name}>`;

    // children
    while (
      shouldLookForChildren &&
      tokens.length > 0 &&
      tokens[0] != parentEndTag
    ) {
      children.push(createNode());
    }

    tokens.shift();

    return {
      name,
      attrs,
      children,
    };
  };

  return createNode();
}

// }}}

// parse {{{

function parse(data) {
  const tokens = tokenize(data);
  return createAST(tokens);
}

// }}}

// prettyprint {{{

function prettyprint(AST, outFile) {
  let output = "";

  function printSection(AST) {
    const { children } = AST;
    let content = "";

    for (child of children) content += printTree(child);

    return content + "\n";
  }

  function printHeading(AST, degree) {
    const { children } = AST;
    let content = "";

    for (let i = 0; i < degree; i++) content += "#";
    content += " ";
    for (child of children) content += printTree(child);

    return content + "\n\n";
  }

  function printBlock(AST) {
    const { children } = AST;
    let content = "";

    for (child of children) content += printTree(child);
    return content + "\n\n";
  }

  function printAnchor(AST) {
    const { attrs, children } = AST;
    const hKey = 'href="';
    const hrefStart = attrs.indexOf(hKey) + hKey.length;
    const hrefEnd = attrs.indexOf('"', hrefStart);

    const url = attrs.substring(hrefStart, hrefEnd);

    let content = "";
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (i > 0) content += " ";
      content += printTree(child);
    }

    return `=> ${url} ${content}\n`;
  }

  function printTree(AST) {
    if (typeof AST === "string") return AST;

    const { name, children } = AST;

    let content = "";

    switch (name) {
      case "header":
      case "footer":
      case "section": {
        content = printSection(AST);
        break;
      }
      case "h1": {
        content = printHeading(AST, 1);
        break;
      }
      case "h2": {
        content = printHeading(AST, 2);
        break;
      }
      case "h3":
      case "h4":
      case "h5":
      case "h6": {
        content = printHeading(AST, 3);
        break;
      }
      case "p": {
        content = printBlock(AST);
        break;
      }
      case "a": {
        content = printAnchor(AST);
        break;
      }
      default: {
        for (child of children) {
          content += printTree(child);
        }
      }
    }

    return content;
  }

  function substituteAmpersand(data) {
    return data.replace(/&#39;/g, "'").replace(/&copy;/g, "©");
  }

  const tree = printTree(AST);
  output = substituteAmpersand(tree);
  fs.writeFileSync(outFile, output, { encoding: "utf8" });
}

// }}}

// main {{{

function main() {
  if (process.argv.length < 4) {
    console.error("USAGE: html2gmi.js (input html file) (output gemtext file)");
    return;
  }

  const inFile = process.argv[2];
  const outFile = process.argv[3];

  let raw = fs.readFileSync(inFile, { encoding: "utf8" });

  // strip unusable tags
  const bodyClose = "</body>";
  raw = raw.substring(raw.indexOf("<body"));
  raw = raw.substring(0, raw.indexOf(bodyClose));

  const AST = parse(raw);

  prettyprint(AST, outFile);
}

// }}}

main();
