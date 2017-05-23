var fs = require('fs')

function isBadgeeCall(memberExpr) {
  const object = memberExpr.get("object");
  const property = memberExpr.get("property");
  return (
    object.isIdentifier({ name: "badgee" }) &&
    property.isIdentifier({ name: "log" })
  )
}


function addToSet(arr, val) {
  var index = arr.indexOf(val)
  if(index<0) return arr.push(val)-1
  return index
}
let strIdx = 0

const replaceStringParametersInBadgeeCalls = {
  // Identifier(path) {
  //   console.log(">>>> Visiting: " + path.node.name);
  // },
  CallExpression(path, state) {
    const callee = path.get("callee");
    const args = path.get("arguments");
    const { t } = this

    if (!callee.isMemberExpression()) return;

    if (isBadgeeCall(callee)) {

      const arr = state._store

      if(!Array.isArray(arr)) throw Error('cannot get store')

      args
        .filter(arg => arg.isStringLiteral())
        .forEach(arg => {
          // add str value to set
          const idx = addToSet(arr, arg.node.value)
          // replace with array index
          arg.replaceWith(
            t.memberExpression(t.identifier('___badgee'), t.numericLiteral(idx), true)
          )
        })
    }
  }
}

export default function({types: t }) {
  return {
    name: "transform-extract-badgee-logs",
    visitor: {
      ImportDeclaration(path, state) {
        // node.source.value contains the import declaration
        const { source } = path.node;

        if (source.value === 'badgee') {
          console.log('>> Found badgee import. Traversing :', state.file.opts.filename)
          path.parentPath.traverse(replaceStringParametersInBadgeeCalls, { t, ...state })
        }
      },
      Program: {
        enter(path, state) {
          state._store = state._store || []
        },
        exit(path, state) {
          state.file.metadata._store = state._store
          const file = state.opts.file
          if(!file) {
            console.warn('file not found. skipping', state._store)
            return
          }
          fs.writeFileSync(file, JSON.stringify(state._store), 'utf8')
        }
      }
    }
  };
};
