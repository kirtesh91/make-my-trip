$(function () {
    $(document).on("click", "[data-toggle-visible]", function (e) {
        e.stopPropagation();
        $(".picker-popup").hide();
        const target = $(this).attr("data-toggle-visible");
        $(`#${target}`).toggle();
    });

    $("[data-hide-visible]").click(function (e) {
        e.stopPropagation();
        const target = $(this).attr("data-hide-visible");
        $(`#${target}`).hide();
    });

    $(".picker-popup").click(function (e) {
        e.stopPropagation();
    });

    $(window).click(function () {
        $(".picker-popup").hide();
    });
});
