export function toCamelCase (pascalCase) {
  if (!pascalCase) return pascalCase
  if (pascalCase.length <= 1) return pascalCase.toLowerCase()
  return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1)
}
