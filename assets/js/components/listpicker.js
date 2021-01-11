(function ($) {
    $.fn.listpicker = function (options) {
        let selected = null;
        const self = this;

        let settings = $.extend(
            {
                data: [],
            },
            options
        );

        const target = this.attr("data-for");
        const { data } = settings;

        const DOM = {
            option: (data) => {
                if (data.active) selected = data;
                return `<li data-value="${data.val}" ${
                    data.active ? "class='active'" : ""
                }>${data.name}</li>`;
            },
        };

        const Render = () => {
            let Options = "";

            data.forEach((data) => (Options += DOM.option(data)));

            this.html(`
                <ul>${Options}</ul>
            `);
        };

        this.addClass("listpicker");

        Render();

        $(this).on("click", "li", function (e) {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");

            const val = $(this).attr("data-value");

            const _selected = data.filter(
                (_data) => _data.val.toString() === val.toString()
            );

            if (!_selected.length) return;

            const previous = selected ? { ...selected } : null;
            selected = _selected[0];

            $(self).trigger("change", {
                target: target,
                current: selected,
                previous: previous,
            });
        });

        return $(this);
    };
})(jQuery);
