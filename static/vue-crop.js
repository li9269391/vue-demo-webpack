;$(function() {

  if (!$.Jcrop) {
    console.error('Uncaught ReferenceError: Jcrop is not defined')
    return
  }

  var vueCrop = {}
  var options = {}
  var events = [
    'create',
    'start',
    'move',
    'end',
    'focus',
    'blur',
    'remove'
  ]

  vueCrop.install = function(Vue) {

    Vue.directive('crop', {

      acceptStatement: true,

      bind: function() {
        var event = this.arg

        if ($.inArray(event, events) == -1) {
          console.warn('Invalid v-crop event: ' + event)
          return
        }

        if (this.vm.jcrop) return

        var $wrapper = $(this.el).wrap('<div/>').parent()

        $wrapper.width(this.el.width).height(this.el.height)

        this.vm.jcrop = $.Jcrop.attach($wrapper, options)
      },

      update: function(callback) {
        this.vm.jcrop.container.on('crop' + this.arg, callback)
      },

      unbind: function() {
        this.vm.jcrop.container.off('crop' + this.arg)

        if (this._watcher.id != 1) return

        this.vm.jcrop.destroy()
        this.vm.jcrop = null
      }
    })
  }

  vueCrop.setOptions = function(opts) {
    options = {
	  setSelect: [25, 25, 250, 250],
	  aspectRatio: 1,
	  bgColor: '#2C7152'
	}
  }

  if (window.Vue) {
    window.VueCrop = vueCrop
    Vue.use(vueCrop)
  }

}());
