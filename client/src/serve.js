const React = require('react');
const renderToString = require('react-dom/server').renderToString;
import Root from "shared/components/Root";

module.exports = function serverRenderer({ clientStats, serverStats, foo }) {
  return (req, res, next) => {
    res.status(200).send(`
            <!doctype html>
            <html>
            <head>
                <title>${foo}</title>
            </head>
            <body>
                <div id="root">${renderToString(React.createElement(Root))}</div>
                <script src="/client.js"></script>
            </body>
            </html>
        `);
  };
}
