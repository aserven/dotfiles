;(function($) {

  $.noty.themes.custom = {
      name: 'custom',
      style: function() {

          var containerSelector = this.options.layout.container.selector;
          $(containerSelector).addClass('alert-container');

          this.$closeButton.append('<span aria-hidden="true">&times;</span>');
          this.$closeButton.addClass('alert-close');

          this.$bar.addClass( "alert-item" ).css('padding', '0px');

          switch (this.options.type) {
              case 'warning':
                  this.$bar.addClass( "alert-item-warning");
                  break;
              case 'error':
                  this.$bar.addClass( "alert-item-error");
                  break;
              case 'info':
                  this.$bar.addClass("alert-item-info");
                  break;
              case 'success':
                  this.$bar.addClass( "alert-item-success");
                  break;
          }

          this.$message.css({
              fontSize: '13px',
              lineHeight: '16px',
              textAlign: 'center',
              padding: '8px 10px 9px',
              width: 'auto',
              position: 'relative'
          });
      },
      callback: {
          onShow: function() {  },
          onClose: function() {  }
      }
  };

})(jQuery);
