function ModalColorPicker() {
  var modal = $('<div class="modal-color-picker modal fade" tabindex="-1" role="dialog"></div>'),
    dialog = $('<div class="modal-dialog"></div>'),
    content = $('<div class="modal-content"></div>'),
    header = $('<div class="modal-header"></div>'),
    body = $('<div class="modal-body"></div>'),
    closeButton = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'),
    title = $('<h4 class="modal-title">Please choose a color</h4>');

  header.append(closeButton).append(title);
  modal.append(dialog);
  dialog.append(content);
  content.append(header).append(body);
  modal.appendTo('body');

  this.modal = $(modal).modal({
    show: false
  });
  this.body = body;
}

ModalColorPicker.prototype.show = function (colors, callback) {
  var me = this,
    picker = $('<div class="color-picker">'),
    onPicked = function (index, color) {
      callback(index, color);
      $(me.modal).modal('hide');
    };
  $.each(colors, function (index, color) {
    $('<a href="#"></a>')
      .addClass('color')
      .css('background-color', color)
      .appendTo(picker)
      .click(function (event) {
        event.preventDefault();
        onPicked(index, color);
      });
  });
  this.body.empty().append(picker);
  $(this.modal).modal('show');
};
