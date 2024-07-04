class HashPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('HashPlugin', (compilation) => {
      compilation.hooks.afterHash.tap('HashPlugin', () => {
        console.log('hash >>> ', compilation.hash);
        for (const chunk of compilation.chunks) {
          console.log('renderedHash >>> ', chunk.renderedHash);
          console.log('contentHash >>> ', chunk.contentHash);
        }
      });
    });
  }
}

module.exports = HashPlugin;
