//THIS SCRIPT CONTROLS THE COLOR OF EACH SVG ELEMENT IN THE NAVIGATION SIDEBAR. BOTH IN THEIR DEFAULT AND HOVER STATE. IT ALSO CHANGES THE BUTTON STATE TO ACTIVE WHEN CLICKED.

$(document).ready(function() {
    $('img[src$=".svg"]').each(function() {
        var $img = jQuery(this);
        var imgURL = $img.attr('src');
        var attributes = $img.prop("attributes");

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Remove any invalid XML tags
            $svg = $svg.removeAttr('xmlns:a');

            // Loop through IMG attributes and apply on SVG
            $.each(attributes, function() {
                $svg.attr(this.name, this.value);
            });

            // Replace IMG with SVG
            $img.replaceWith($svg);
        }, 'xml');
    });
});