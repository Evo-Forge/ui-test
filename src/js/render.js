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
