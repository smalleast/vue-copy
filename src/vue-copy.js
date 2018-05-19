var copy = require('clipboard/dist/clipboard.min.js') // FIXME: workaround for browserify

var VueCopy = {
  install: function (Vue) {
    Vue.prototype.$copyText = function (text, container) {
      return new Promise(function (resolve, reject) {
        var fake_el = document.createElement('button');
        var copy = new copy(fake_el, {
          text: function () { return text },
          action: function () { return 'copy' },
          container: typeof container === 'object' ? container : document.body
        });
        copy.on('success', function (e) {
          copy.destroy();
          resolve(e);
        });
        copy.on('error', function (e) {
          copy.destroy();
          reject(e);
        });
        fake_el.click();
      });
    };

    Vue.directive('copy', {
      bind: function (el, binding, vnode) {
        if(binding.arg === 'success') {
          el._v_copy_success = binding.value
        } else if(binding.arg === 'error') {
          el._v_copy_error = binding.value
        } else {
          var copy = new copy(el, {
            text: function () { return binding.value },
            action: function () { return binding.arg === 'cut' ? 'cut' : 'copy' }
          })
          copy.on('success', function (e) {
            var callback = el._v_copy_success
            callback && callback(e)
          })
          copy.on('error', function (e) {
            var callback = el._v_copy_error
            callback && callback(e)
          })
          el._v_copy = copy
        }
      },
      update: function (el, binding) {
        if(binding.arg === 'success') {
          el._v_copy_success = binding.value
        } else if(binding.arg === 'error') {
          el._v_copy_error = binding.value
        } else {
          el._v_copy.text = function () { return binding.value }
          el._v_copy.action = function () { return binding.arg === 'cut' ? 'cut' : 'copy' }
        }
      },
      unbind: function (el, binding) {
        if(binding.arg === 'success') {
          delete el._v_copy_success
        } else if(binding.arg === 'error') {
          delete el._v_copy_error
        } else {
          el._v_copy.destroy()
          delete el._v_copy
        }
      }
    })
  }
}

if (typeof exports == "object") {
  module.exports = VueCopy
} else if (typeof define == "function" && define.amd) {
  define([], function() {
    return VueCopy
  })
}
