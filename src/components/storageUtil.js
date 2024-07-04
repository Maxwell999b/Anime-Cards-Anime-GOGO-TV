function cleanupMangaSessionStorage() {
  const prefix = "mangaDetails_";
  const keysToRemove = Object.keys(sessionStorage).filter((key) => key.startsWith(prefix));

  keysToRemove.forEach((key) => {
    sessionStorage.removeItem(key);
  });
}

export { cleanupMangaSessionStorage };
