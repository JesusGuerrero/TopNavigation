$(document).ready( function(){
    'use strict';
    $('.search-modal').on('show.bs.modal', function () {
        var searchModal = this;
        setTimeout( function(){
            $('.modal-backdrop').first().appendTo( $('#hl_global_header') );
            $('input', searchModal).val('').focus();
        }, 10);

    });
});
