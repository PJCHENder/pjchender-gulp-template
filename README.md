# This is a template of gulp to process pug, sass/scss, and js file.


## Usage

### SCSS/SASS Compiling Only

Write your code in `src` folder.

For HTML files, put them into `views` folder. Also, remember to add the css link:

```html
<link rel="stylesheet" href="style.css">
```

And JS link:

```html
<script src="main.js"></script>
```

Write your SCSS and JS in `sass` and `js` folders respectively.

In your terminal, run:

```shell
npm install
npm run start
```

Enjoy using browserSync while coding.

## Notes

- 如果 function 有 return 就不用呼叫 `next()`，沒有的話則需要呼叫 `next()`，否則會被認為是沒影終止的非同步事件
