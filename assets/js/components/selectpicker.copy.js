$(function () {
    const DOM = {
        option: (data) => {
            return `<li
                        role="option"
                        data-id="${data.id}"
                        data-type="flight-city"
                    >
                        <div class="option">
                            <div class="flex-1">
                                <p class="name">
                                    ${data.name}, ${data.location}
                                </p>
                                <p class="detail">
                                    ${data.airport}
                                </p>
                            </div>
                            <div class="extra">${data.code}</div>
                        </div>
                    </li>`;
        },
    };

    const toggleSelectBox = (target) => {
        $(`.selectpicker[data-for=${target}]`).toggleClass("d-block");
    };

    const updateSelectTarget = (_target, data, type) => {
        const target = $(`[data-select-target=${_target}]`);

        if (type === "flight-city") {
            target.find(".value").text(data.name);
            target
                .find(".info")
                .text(`${data.code}, ${data.airport}, ${data.location}`);
        }
        toggleSelectBox(_target);
    };

    $("[data-selectpicker]").each(function () {
        const options = DATA[$(this).attr("data-options")];

        let Options = "";

        options.forEach((data) => (Options += DOM.option(data)));

        $(this).html(`
            <input
                type="text"
                placeholder="Search..."
            />
            <ul class="options">
                ${Options}
            </ul>
        `);
    });

    $("[data-select-target]").click(function () {
        $(".picker").removeClass("d-block");
        const target = $(this).attr("data-select-target");
        toggleSelectBox(target);
    });

    $(".selectpicker").on("click", "li", function (e) {
        e.stopPropagation();

        const val = $(this).attr("data-id");
        const parent = $(this).closest(".selectpicker");

        let data = DATA[parent.attr("data-options")].filter(
            (_data) => _data.id.toString() === val.toString()
        );

        if (!data.length) return;
        data = data[0];

        const target = parent.attr("data-for");
        const type = $(this).attr("data-type");

        updateSelectTarget(target, data, type);
    });
});
