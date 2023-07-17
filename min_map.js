class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}
function generateHTMLTree(node) {
  const ulElement = document.createElement("ul");
  const liElement = document.createElement("li");
  liElement.textContent = node.value;

  if (node.children.length > 0) {
    for (const child of node.children) {
      const childTree = generateHTMLTree(child);
      liElement.appendChild(childTree);
    }
  }

  ulElement.appendChild(liElement);
  return ulElement;
}
// Supposons que vous ayez déjà construit l'arbre syntaxique et stocké sa racine dans une variable rootNode.

// Générer l'arbre HTML
const syntaxTreeElement = generateHTMLTree(rootNode);

// Ajouter l'arbre à l'élément div avec l'ID "syntaxTree"
const syntaxTreeContainer = document.getElementById("syntaxTree");
syntaxTreeContainer.appendChild(syntaxTreeElement);
