export function deleteEmptyKeys(obj: any): any {
  for (const key in obj) {
    if (obj[key] === '') {
      delete obj[key]
    }
  }

  return obj
}
