module.exports = {
    entry: './src/App.jsx',

    output: {
        filename: 'bundle.js',
        path: './public',
    },

    devServer: {
        inline: true,
        contentBase: './public',
        port: 3000
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }
        ]
    },

    devtool: 'eval-source-map',
    
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
