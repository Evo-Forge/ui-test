/*jshint esversion: 6 */
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
      if (evt.keyCode == 27 || evt.which === 1) {
        $input.val('');
        $tr.show();
        $('.highlighted').contents().unwrap();
      }
    }

    return {
      init: init
    };
    
})(jQuery);
