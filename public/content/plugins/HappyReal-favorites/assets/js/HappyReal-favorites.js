jQuery(document).ready(function($) {
    'use strict';

    /**
     * Favorite toggle button
     */
    var favorite_toggle_class = ".realia-favorites-btn-toggle";
    $(document).on("click", favorite_toggle_class, function(e) {
        var action = $(this).hasClass("marked") ? "realia_favorites_remove_favorite" : "realia_favorites_add_favorite";
        var toggler = $(this);
        console.log(action,toggler);
        $.ajax({
            url: toggler.data('ajax-url'),
            data: {
                'action': action,
                'id': toggler.data('property-id')
            }
        }).done(function( data ) {
            if (data.success) {
                toggler.toggleClass("marked");
                var span = toggler.children("span");
                var toggleText = span.data("toggle");
                span.data("toggle", span.text());
                span.text(toggleText);
            } else {
                alert(data.message);
            }
        });

        e.preventDefault();
    });
});
