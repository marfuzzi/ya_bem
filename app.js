const path = require('path');
const express = require('express');
const useragent = require('express-useragent');
const cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(useragent.express());

app.get('*', function(req, res) {
    if (req.useragent.isMobile) {
        res.sendFile(path.resolve(path.join(__dirname, 'views'), 'mobile.html'));
    } else if (req.useragent.isTablet) {
        res.sendFile(path.resolve(path.join(__dirname, 'views'), 'tablet.html'));
    } else {
        res.sendFile(path.resolve(path.join(__dirname, 'views'), 'desktop.html'));
    }
});

app.listen(process.env.PORT || 9000, () =>
    console.log(`Express app listening on localhost:${process.env.PORT || '9000'}`));
