import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
    constructor() {
        this.itemsToReveal = $(".feature-item");
        this.hideInitially();
        this.createWaypoints();
    }

    hideInitially() {
        this.itemsToReveal.addClass('reveal-item');
    }

    createWaypoints() {
        this.itemsToReveal.each(function() {
            var element = this;
            new Waypoint({
                element: element,
                handler: function() {
                    $(element).addClass('reveal-item--is-visible');
                },
                offset: "85%"
            });
        });
    }
}

export default RevealOnScroll;