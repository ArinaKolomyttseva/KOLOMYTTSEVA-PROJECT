$(document).ready(function() {

    const offerSlider = $('.offer-slider').slick({
        arrows: false,
        autoplay: true,
        speed: 1200,
        fade: true
    })

    $('.dropdown__header').click(function() {
        $(this).next().slideToggle(300)
        $(this).parent().toggleClass('show')
    })

    $('.dropdown__item').click(function() {
        // $(this).closest('.dropdown').
    })

    $('.cart-open').click(function(e) {
        e.preventDefault()
        $('.cart').show()
        setTimeout(function() {
            $('.cart').addClass('show')
        }, 50)
    })

    $(window).click(function(e) {
        if (!$(e.target).closest('.cart').length && $('.cart').hasClass('show') && !$(e.target).hasClass('service__detail')) {
            $('.cart').removeClass('show')
            setTimeout(function() {
                $('.cart').hide()
            }, 300)
        }
        if (!$(e.target).closest('.dropdown').length || $(e.target).hasClass('dropdown__item')) {
            $('.dropdown').removeClass('show')
            $('.dropdown__body').slideUp(300)
        }
    })

    $('.cart__close').click(function() {
        $('.cart').removeClass('show')
        setTimeout(function() {
            $('.cart').hide()
        }, 300)
    })

    $('.cart .order').each((i, el) => {setHandlers(el)})

    function setHandlers(order) {
        $(order).find('.order__delete').click(function() {
            setTimeout(() => {
                $(this).parent().remove()
                updateCartTotal()
            }, 50)
        })
    
        $(order).find('.order__control:first-child').click(function() {
            const amount = Number.parseInt($(this).closest('.order').attr('data-amount'))
            if (amount - 1 == 0) {
                $(this).closest('.order').remove()
            }
            $(this).closest('.order').attr('data-amount', amount - 1)
            updateCartOrders()
            updateCartTotal()
        })
    
        $(order).find('.order__control:last-child').click(function() {
            const amount = Number.parseInt($(this).closest('.order').attr('data-amount'))
            $(this).closest('.order').attr('data-amount', amount + 1)
            updateCartOrders()
            updateCartTotal()
        })
    }

    function updateCartTotal() {
        let sum = 0
        $('.cart .order').each(function(i, el) {
            sum += Number.parseInt($(el).attr('data-amount')) * Number.parseInt($(el).attr('data-price'))
        })
        
        $('.cart__total span').text(`${sum.toLocaleString()} р.`)
    }

    function updateCartOrders() {
        $('.cart .order').each(function(i, order) {
            $(order).find('.order__num').text($(order).attr('data-amount'))
            const newPrice = Number.parseInt($(order).attr('data-amount')) * Number.parseInt($(order).attr('data-price'))
            $(order).find('.order__price').text(newPrice.toLocaleString() + ' р.')
        })
        updateCartTotal()
    }

    $('.service__detail').click(function(e) {
        e.preventDefault()

        const service = $(this).parent()
        const order = $(`.cart .order[data-service="${service.attr('data-service')}"]`)
        
        if (order.length) {
            order.attr('data-amount', Number.parseInt(order.attr('data-amount')) + 1)
        } else {
            let res = `
            <div class="cart__order order" data-service='${ service.attr('data-service') }' data-price="${ Number.parseInt(service.find('.service__price span:first-child').text().split(' ').join('')) }" data-amount="1">
                <img src="${ service.find('img').attr('src') }" alt="" class="order__img">`

             res += `<h3 class="order__title">${ service.find('.service__title').text() }</h3>
                    <div class="order__amount">
                        <div class="order__control">-</div>
                        <div class="order__num">1</div>
                        <div class="order__control">+</div>
                    </div>
                    <div class="order__price"></div>
                    <div class="order__delete">+</div>
                </div>
            </div>`

            $('.cart__orders').append(res)
            setHandlers($('.cart__orders .order:last-child').get(0))
        }

        updateCartOrders()
        updateCartTotal()
    })

    $('.order-form').on('submit', function(e) {
        e.preventDefault()

        const form = $(this)
        const nameInp = form.find('input[name="name"]')
        const telInp = form.find('input[name="tel"]')
        const cityInp = form.find('input[name="city"]')

        form.find('.error-message').text('')

        let valid = true

        if (nameInp.val().length < 2) {
            nameInp.next('.error-message').text('Минимальная длина ввода - 2 символа')
            valid = false
        }

        if (nameInp.val().length == 0) {
            nameInp.next('.error-message').text('Это поле обязательно к заполнению')
            valid = false
        }

        if (!new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).test(telInp.val())) {
            telInp.next('.error-message').text('Введите корректный номер телефона')
            valid = false
        }

        if (telInp.val().length == 0) {
            telInp.next('.error-message').text('Это поле обязательно к заполнению')
            valid = false
        }

        if (cityInp.val().length < 3) {
            cityInp.next('.error-message').text('Минимальная длина ввода - 3 символа')
            valid = false
        }

        if (cityInp.val().length == 0) {
            cityInp.next('.error-message').text('Это поле обязательно к заполнению')
            valid = false
        }

        if (valid) {
            alert('Форма отправлена!')
            form.get(0).reset()
        }
    })

    $('.burger').click(function() {
        $('.header__nav').slideToggle(300)
    })

    $('.header__link').click(function() {
        if ($(window).width() < 992) {
            $('.header__nav').slideUp(300)
        }
    })

    $('.feedback').on('submit', function(e) {
        e.preventDefault()

        const form = $(this)
        const nameInp = form.find('input[name="name"]')
        const surnameInp = form.find('input[name="surname"]')
        const telInp = form.find('input[name="tel"]')
        const emailInp = form.find('input[name="email"]')

        form.find('.error-message').text('')

        let valid = true

        if (nameInp.val().length < 2) {
            nameInp.next('.error-message').text('Минимальная длина ввода - 2 символа')
            valid = false
        }

        if (nameInp.val().length == 0) {
            nameInp.next('.error-message').text('Это поле обязательно к заполнению')
            valid = false
        }

        if (surnameInp.val().length < 2) {
            surnameInp.next('.error-message').text('Минимальная длина ввода - 2 символа')
            valid = false
        }

        if (surnameInp.val().length == 0) {
            surnameInp.next('.error-message').text('Это поле обязательно к заполнению')
            valid = false
        }

        if (!new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).test(telInp.val())) {
            telInp.next('.error-message').text('Введите корректный номер телефона')
            valid = false
        }

        if (telInp.val().length == 0) {
            telInp.next('.error-message').text('Это поле обязательно к заполнению')
            valid = false
        }

        if (emailInp.val().length == 0) {
            emailInp.next('.error-message').text('Это поле обязательно к заполнению')
            valid = false
        }

        if (valid) {
            alert('Форма отправлена!')
            form.get(0).reset()
        }
    })
})