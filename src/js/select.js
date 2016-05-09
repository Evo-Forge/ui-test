/*jshint esversion: 6 */
/*global jQuery */
/**
 *
 * @fileOverview Select table rows
 * @author Leonard Keresztesi
 * @version 0.1.0
 *
 */
var select = (function($){

  let $checkBox,
      $mainCheckbox,
      $messageText = $('.message-text'),
      $tr,
      selectedRows=[],
    selected = 0;
  /**
   * Init function
   */
  function init(element) {
    $checkBox = element.find('input[type=checkbox]');
    $mainCheckbox=element.find('#mainCheckbox');
    $tr=element.find('tr');
    $checkBox.on('change', selectRow);
    selectedRow();
  }
  /**
   * Remove event listener and empty variable
   */
  function destroy() {
    $checkBox = '';
    $mainCheckbox='';
    $tr='';
    $(document).off('change', $checkBox);
  }
  /**
   * Set selected rows
   */
  function selectedRow() {
      if(selectedRows.length){
        $.each(selectedRows,function(index,item){
          $tr.eq(item+1).toggleClass('selected').find('.checkBox').toggleClass('checked');
        });
        $mainCheckbox.parent().addClass('indeterminate');
      }
  }
  /**
   * Select rows
   */
  function selectRow(evt) {
    if($(evt.target).attr('id') !== 'mainCheckbox'){
      $(evt.target).closest('tr').toggleClass('selected').find('.checkBox').toggleClass('checked');
      selectedRows.push($(evt.target).closest('tr').index());
      $mainCheckbox.parent().addClass('indeterminate');
      selected=selected+1;
      showselected(selected);
    } else {
      let status=$mainCheckbox.parent().attr('class').trim();
      if(status==='checkBox'){
          $tr.addClass('selected').find('.checkBox').addClass('checked');
          $mainCheckbox.parent().attr('class','checkBox checked');
          selected=$tr.length-1;
          showselected(selected);
          $.each($tr,function(index,item){
            selectedRows.push(index);
          });
        }else {
          $tr.removeClass('selected').find('.checkBox').removeClass('checked');
          $mainCheckbox.parent().attr('class','checkBox');
          hideselected();
      }
    }
  }
  /**
   * Display selected rows number message
   */
  function showselected(rows) {
    $messageText.find('.selRows').html(rows).end().show();
  }
  /**
   * Hide selected rows number message
   */
  function hideselected() {
    $messageText.find('.selRows').html('').end().hide();
    selectedRows=[];
  }

  return {
    init: init,
    destroy: destroy
  };
  
})(jQuery);
