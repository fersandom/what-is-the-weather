module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
            @import "@/scss/_globals.scss", "@/scss/_variables.scss" ;
          `
            }
        }
    }
};
