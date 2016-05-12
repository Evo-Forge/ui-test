/*jshint esversion: 6 */
/*global jQuery, Handlebars */
/**
 *
 * @fileOverview Render the table for UI Test
 * @author Leonard Keresztesi
 * @version 0.1.0
 *
 */
var render = (function($){

    let rows= 20,
        tableData= {},
        selButton= 0,
        dataUrl= 'src/resources/MOCK_DATA_1000.json',
        $tableTemplate,
        /**
         * DOM caching
         */
        $template = $("#table-template").html(),
        $table = $('table'),
        $buttons = $('.btn:not(.reset)'),
        $resetButton = $('.reset-rows'),
        $resetFilter = $('.reset-filter');

    /**
     * Bind events
     */
    $resetButton.on('click', resetTable);
    $buttons.on('click', addRows);
    /**
     * Init function
     */
    function init() {
      initTemplate();
      loadData();
    }
    /**
     * Compile Handlebars template
     */
    function initTemplate() {
      $tableTemplate = Handlebars.compile($template);
    }
    /**
     * Load data from JSON
     */
    function loadData() {
      $.getJSON(dataUrl, function(data) {
          tableData = data;
          render();
      });
    }
    /**
     * Delete all rows
     */
    function resetTable() {
      rows = 0;
      render(true);
    }
    /**
     * Add rows to the table;
     */
    function addRows(evt) {
      if(!$(evt.target).hasClass('selected')){
        //Get the number from button text
        let getRows = parseInt($(evt.target).html().replace(/[^\d]+/g, '')),
        //Get clicked button index
          buttonNo = $(evt.target).index()-1;

        selButton = buttonNo;
        rows = getRows;
        render();
      }
    }
    /**
     * Render content
     */
    function render(removing=false) {
      $buttons.removeClass('selected');
      $table.empty().append($tableTemplate(tableData.slice(0, rows)));
      select.destroy();
      if(removing){
        $resetButton.hide();
      }else {
        $resetButton.show();
        $buttons.eq(selButton).addClass('selected');

        select.init($table);
        filter.init($table);
      }
    }

    return {
      init: init
    };
    
})(jQuery);

/*global jQuery */
/**
 *
 * @fileOverview Filter table rows
 * @author Leonard Keresztesi
 * @version 0.1.0
 *
 */
var filter = (function($){

    const ESCAPE_KEY = 27;
    const MOUSE_LEFT = 1;

    let $input = $('.filterInput'),
      $resetFilter = $('.reset-filter'),
      $tr;
    /**
     * Init function
     */
    function init(element) {
      $tr=element.find('tbody > tr');
      $input.on('keyup', filterRows);
      $input.on('keydown', resetFilter);
      $resetFilter.on('click', resetFilter);
    }
    /**
     * Remove event listener and empty variable
     */
    function destroy() {
      $tr='';
    }
    /**
     * Filter table rows
     */
    function filterRows() {
      $.extend($.expr[":"], {
        "containsIN": function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
      });

      let filterValue = this.value.toLowerCase().split(" "),
          filter = false;
      //Detect if is text or number, if is text, wait until are 3 chars
      if(isNaN(filterValue)){
        if(filterValue[0].length > 2) {
          filter=true;
        }
      }else {
        filter=true;
      }
      if(filter) {
        if (this.value === "") {
            $('.highlighted').contents().unwrap();
            $tr.show();
            return;
        }
        //hide all the rows
        $tr.hide();
        //filter and show the rows that match.
        $tr.filter(function (i, v) {
          let $t = $(this);
          for (let d = 0; d < filterValue.length; ++d) {
              if ($t.text().toLowerCase().indexOf(filterValue[d]) > -1) {
                  return true;
              }
          }
          return false;
        }).show();

        $('.highlighted').contents().unwrap();

        $('td:visible:containsIN("'+filterValue+'")').each(function(){
          let re = new RegExp(filterValue,"ig");
          let selectText = $(this).html().replace(re, function (match) {
            return '<span class="highlighted">' + match + '</span>'  ;
          });

          $(this).html(selectText);
        });
      }
    }
    /**
     * Reset filter and show all the rows
     */
    function resetFilter(evt) {
      if (evt.keyCode == ESCAPE_KEY || evt.which === MOUSE_LEFT) {
        $input.val('');
        $tr.show();
        $('.highlighted').contents().unwrap();
      }
    }

    return {
      init: init
    };

})(jQuery);

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
      if($(evt.target).closest('tr').hasClass('selected')){
         selected++;
       } else{
         selected--;
       }
       if(selected > 0){
          showselected(selected);
       } else {
         hideselected();
       }
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
    $mainCheckbox.parent().attr('class','checkBox');
    $messageText.find('.selRows').html('').end().hide();
    selected = 0;
    selectedRows=[];
  }

  return {
    init: init,
    destroy: destroy
  };

})(jQuery);

/*global jQuery */
/**
 *
 * @fileOverview UI Test
 * @author Leonard Keresztesi
 * @version 0.1.0
 *
 */
jQuery(function ($) {

  var App = {
    init(){
      render.init();
    }
  };

  App.init();
  
});
