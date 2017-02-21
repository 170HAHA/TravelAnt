# vue-select [![Build Status](https://travis-ci.org/sagalbot/vue-select.svg?branch=master)](https://travis-ci.org/sagalbot/vue-select) [![Code Coverage](https://img.shields.io/codeclimate/coverage/github/sagalbot/vue-select.svg?style=flat-square)](https://codeclimate.com/github/sagalbot/vue-select) [![No Dependencies](https://img.shields.io/gemnasium/sagalbot/vue-select.svg?style=flat-square)](https://gemnasium.com/github.com/sagalbot/vue-select) ![MIT License](https://img.shields.io/github/license/sagalbot/vue-select.svg?style=flat-square) ![Current Release](https://img.shields.io/github/release/sagalbot/vue-select.svg?style=flat-square)

> A native Vue.js select component that provides similar functionality to Select2 without the overhead of jQuery.

#### Features
- AJAX Support
- Tagging
- List Filtering/Searching
- Supports Vuex
- Select Single/Multiple Options
- Bootstrap Friendly Markup
- +95% Test Coverage

## Documentation
- **[Demo & Docs](http://sagalbot.github.io/vue-select/)**
- **[Example on JSBin](http://jsbin.com/saxaru/5/edit?html,js,output)**

## Install & Basic Usage

#### Vue Compatability
- `vue-select ~2.0` is compatible with `vue ~2.0`
- `vue-select ~1.0` is compatible with `vue ~1.0`

#### NPM

```bash
$ npm install vue-select
```

```html
<template>
   <div>
      <v-select v-model="select" :options="options"></v-select>
   </div>
</template>

<script>
import vSelect from 'vue-select'
export default {
  components: {vSelect},
  data() {
     return {
        selected: null,
        options: ['foo','bar','baz']
     }
  }
}
</script>
```

#### CDN/Browser Globals

Just include `vue` & `vue-select.js` - I recommend using [unpkg](https://unpkg.com/#/).

```html
<!-- use the latest release -->
<script src="https://unpkg.com/vue-select@latest"></script>
<!-- or point to a specific release -->
<script src="https://unpkg.com/vue-select@1.3.3"></script>
```
Then register the component in your javascript:

```js
Vue.component('v-select', VueSelect.VueSelect);
```

From there you can use as normal. Here's an [example on JSBin](http://jsbin.com/saxaru/5/edit?html,js,output).

### For more information, please visit the [vue-select documentation.](https://sagalbot.github.io/vue-select)
