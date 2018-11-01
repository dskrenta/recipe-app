export default function recipeImage(url) {
  if (url.startsWith('https')) {
    return url;
  }
  else {
    return url.slice(0,4) + 's' + url.slice(4);
  }
}