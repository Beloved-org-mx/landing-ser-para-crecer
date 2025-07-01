// Smooth scrolling
$('.anchor').on('click', function (event) {
    event.preventDefault();
    let Item = $(this).attr('href');

    $('body, html').stop(true, true).animate({
        scrollTop: $(Item).offset().top - 66
    }, 1000);
});