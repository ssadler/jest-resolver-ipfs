module.exports = (path, options) => {
  // Call the defaultResolver, so we leverage its cache, error handling, etc.
  return options.defaultResolver(path, {
    ...options,
    // Use packageFilter to process parsed `package.json` before the resolution (see https://www.npmjs.com/package/resolve#resolveid-opts-cb)
    packageFilter: pkg => {
      if (pkg.name.startsWith('ipfs-core-utils')) {
        console.log("PKG IS", pkg.name);
        let rest = pkg.name.slice('ipfs-core-utils'.length)
        let main = pkg.exports['.' + rest]['import']
        console.log("MAIN IS", main)
        return {
          main: pkg.exports['.' + rest]['import'],
          ...pkg
        }
      }
      return pkg
    },
  });
};
